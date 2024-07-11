// begin
import { createHash, randomBytes, createHmac } from 'crypto'
import base58 from 'bs58'
import secp256k1 from 'secp256k1'
import wordList from 'bip39/src/wordlists/english.json'
import { entropyToMnemonic, mnemonicToSeedSync } from 'bip39'


export default class KeyService {

  // Helper functions
  createMnemonic(numberOfWords: 12 | 24) {
    const bytes = numberOfWords === 12 ? 16 : 32
    const entropy = this.createEntropy(bytes)
    const mnemonic = entropyToMnemonic(entropy, wordList)
    return mnemonic
  }

  createSeedFromMnemonic(mnemonic: string) {
    const seed = mnemonicToSeedSync(mnemonic)
    return seed
  }

  createEntropy(bytes: number = 16) {
    const entropy = randomBytes(bytes)
    return entropy
  }

  createExtendedSeed(seed: Buffer) {
    const extendedSeed = createHmac('sha512', Buffer.from('Bitcoin seed', 'utf8')).update(seed).digest()
    return extendedSeed
  }

  encodeBase58(data: Buffer) {
    return base58.encode(data)
  }
  
  sha256(buffer: Buffer) {
    return createHash('sha256').update(buffer).digest();
  }

  hash160(buffer: Buffer) {
    const sha256Hash = this.sha256(buffer);
    return createHash('ripemd160').update(sha256Hash).digest();
  }


  createChecksum(buffer: Buffer) {
    return this.sha256(this.sha256(buffer)).subarray(0, 4);
  }
  
  createHardenedIndex(index: number): number {
    const HARDENED_OFFSET = 0x80000000; // This is 2^31 in hexadecimal
    return index + HARDENED_OFFSET;
  }

  getParentFingerprint(publicKey: Buffer): number {
    const hash1 = createHash('sha256').update(publicKey).digest();
    const hash2 = createHash('ripemd160').update(hash1).digest();
    const parentFingerprint = hash2.subarray(0, 4).readUInt32BE(0)
    return parentFingerprint
  }

  createMasterKey(seed: Buffer) {
    let extendedSeed
    let masterKey

    do {
      extendedSeed = this.createExtendedSeed(seed)
      masterKey = extendedSeed.subarray(0, 32)
    } while (!secp256k1.privateKeyVerify(masterKey))

    const chainCode = extendedSeed.subarray(32)

    return { masterKey, chainCode }
  }

  createPublicKey(privateKey: Buffer): Buffer {
    let publicKey
    // convert privateKey to UInt8Array
    const privateKeyArray = new Uint8Array(privateKey, 0, 32)

    do {
      publicKey = Buffer.from(secp256k1.publicKeyCreate(privateKeyArray, true), 0, 33)
    } while (!secp256k1.publicKeyVerify(publicKey))

    // convert to buffer hex
    return publicKey // Buffer.from(publicKey, 0, 33)
  }


  createWIF(
    xprv: string,
  ) {
    // WIF file structure:
    // 1. Version Byte (1 Byte)
    // 2. Private Key (32 Bytes)
    // 3. Checksum (4 Bytes)  

    const version = Buffer.allocUnsafe(1)
    // WIF version: 0x80 (mainnet), 0xef (testnet)
    version.writeUInt8(0x80)

    // decode the xprv from base58
    const xprvBuffer = base58.decode(xprv)
    // remove the checksum from the xprvBuffer
    const privateKey = xprvBuffer.subarray(45, 77)

    // add the version byte to the private key    
    const key = Buffer.concat([version, privateKey])

    // add checksum to the key
    const checksum = this.createChecksum(key)
    return Buffer.concat([key, checksum])
  }

  deriveP2WPKHAddress(publicKey: Buffer) {
    // P2WPKH address structure according to BIP141:
    // 1. Witness Version (1 Byte)
    // 2. Public Key Hash (20 Bytes)
    // 3. Checksum (4 Bytes)

    // hash the public key
    const publicKeyHash = this.hash160(publicKey)

    // add the witness version byte
    const version = Buffer.allocUnsafe(1)
    version.writeUInt8(0x00)

    // add the version byte to the public key hash
    const key = Buffer.concat([version, publicKeyHash])

    // add checksum to the key
    const checksum = this.createChecksum(key)
    return Buffer.concat([key, checksum])

  }

  createBTCAddress(publicKey: Buffer) {

    // The address is derived from the public key 
    // using SHA256 and RIPEMD160
    const sha256 = createHash('sha256').update(publicKey).digest()
    const ripemd160 = createHash('ripemd160').update(sha256).digest()

    // BTC adress structure:
    // 1. Version Byte (1 Byte)
    // 2. RIPEMD160 Hash (20 Bytes)
    // 3. Checksum (4 Bytes)
    // The address is encoded in base58
    const version = Buffer.allocUnsafe(1)
    // the version byte for BTC address is 0x00 (mainnet) or 0x6f (testnet)
    version.writeUInt8(0x00)
    // checksum is the first 4 bytes of the double SHA256 hash of the version byte and RIPEMD160 hash
    const key = Buffer.concat([version, ripemd160])
    const checksum = this.createChecksum(key)
    const address = Buffer.concat([key, checksum])

    // encode the address in base58
    return base58.encode(address)
  }

  createExtendedPrivateKey(privateKey: Buffer, chainCode: Buffer, depth: number = 0, parentFingerprint: number = 0, childNumber: number = 0) {

    const xprvPrefix = 0x0488ADE4 // xprv

    const xprv = Buffer.allocUnsafe(78)
    xprv.writeUInt32BE(xprvPrefix, 0) // 4 bytes - xprv
    xprv.writeUInt8(depth, 4) // 1 byte - depth    
    xprv.writeUInt32BE(parentFingerprint, 5) // 4 bytes - parent fingerprint
    xprv.writeUInt32BE(childNumber, 9) // 4 bytes - child number
    chainCode.copy(xprv, 13) // 32 bytes - chain code
    xprv.writeUInt8(0, 45) // 1 byte - private key padding
    privateKey.copy(xprv, 46) // 32 bytes - private key
    const xprvChecksum = this.createChecksum(xprv)
    const xprvAddress = Buffer.concat([xprv, xprvChecksum])
    const xprvBase58 = base58.encode(xprvAddress)
    return xprvBase58
  }

  createExtendedPublicKey(
    publicKey: Buffer,
    chainCode: Buffer,
    depth: number = 0,
    parentFingerprint: number = 0,
    childNumber: number = 0) {

    if (publicKey.length !== 33) {
      throw new Error('Invalid public key length')
    }

    if (!secp256k1.publicKeyVerify(publicKey)) {
      throw new Error('Invalid public key')
    }

    const xpubPrefix = 0x0488B21E // xpub
    const xpub = Buffer.allocUnsafe(78)
    xpub.writeUInt32BE(xpubPrefix, 0) // 4 bytes
    xpub.writeUInt8(depth, 4) // 1 byte - depth    
    xpub.writeUInt32BE(parentFingerprint, 5) // 4 bytes - parent fingerprint, 0 for master node
    xpub.writeUInt32BE(childNumber, 9) // 4 bytes - child number
    chainCode.copy(xpub, 13) // 32 bytes - chain code
    publicKey.copy(xpub, 45) // 33 bytes - public key
    const xpubChecksum = this.createChecksum(xpub)
    const xpubAddress = Buffer.concat([xpub, xpubChecksum])
    const xpubBase58 = base58.encode(xpubAddress)

    return xpubBase58
  }

  

  deriveChildPrivateKey(
    masterKey: Buffer,
    chainCode: Buffer,
    index: number,
  ) {
    const isHardened = index >= 0x80000000;
    const n = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141');

    // mount the data to be hashed
    const privateKeyPadding = Buffer.allocUnsafe(1)
    privateKeyPadding.writeUInt8(0, 0)

    const indexBuffer = Buffer.allocUnsafe(4)
    indexBuffer.writeUInt32BE(index, 0)

    const key = isHardened
      ? Buffer.concat([privateKeyPadding, masterKey])
      : this.createPublicKey(masterKey)

    const data = Buffer.concat([key, indexBuffer])
    const hmac = createHmac('sha512', chainCode).update(data).digest()
    const derivedKey = hmac.subarray(0, 32)
    const derivedChainCode = hmac.subarray(32)
    const parse256IL = BigInt(`0x${derivedKey.toString('hex')}`)
    if (parse256IL >= n) {
      throw new Error("Derived key is invalid (greater or equal to curve order).")
    }

    const kpar = BigInt(`0x${masterKey.toString('hex')}`)
    const ki = (parse256IL + kpar) % n

    if (ki === BigInt(0)) {
      throw new Error("Derived key is invalid (zero value).");
    }

    const childKey = Buffer.from(ki.toString(16).padStart(64, '0'), 'hex')


    return { childKey, derivedChainCode }
  }

  convertPathToArray(path: string) {
    const pathArray: number[] = []
    const segments = path.split('/').slice(1)
    // console.log('segments', segments)
    segments.forEach(segment => {      
      if (segment.endsWith("'")) {
        pathArray.push(this.createHardenedIndex(parseInt(segment.slice(0, -1), 10)))
      } else {
        pathArray.push(parseInt(segment, 10))
      }
    })

    return pathArray
  }

  // Automatically creates extended private and public keys for a given path and keypair
  deriveFromPath(masterKey: Buffer, chainCode: Buffer, path: string) {
    
    if (path === 'm') {
      const xprvBase58 = this.createExtendedPrivateKey(
        masterKey,
        chainCode,
      )
      const xpubBase58 = this.createExtendedPublicKey(
        this.createPublicKey(masterKey),
        chainCode,
      )
      return {
        xprvBase58,
        xpubBase58,
      }
    }
    // split the path into segments
    const segments = this.convertPathToArray(path)    
    let key = masterKey
    let chain = chainCode
    let parentFingerprint = 0
    let childNumber = 0
    let depth = 0
    
    // iterate over the path segments of bip32
    for (let i = 0; i < segments.length; i++) {
      const index = segments[i]
      const { childKey, derivedChainCode } = this.deriveChildPrivateKey(key, chain, index)
      const parentPublicKey = this.createPublicKey(key)
      parentFingerprint = this.getParentFingerprint(parentPublicKey)
      key = childKey
      chain = derivedChainCode
      childNumber = index
      depth++
    }

    const xprvBase58 = this.createExtendedPrivateKey(
      key,
      chain,
      depth,
      parentFingerprint,
      childNumber
    )

    const xpubBase58 = this.createExtendedPublicKey(
      this.createPublicKey(key),
      chain,
      depth,
      parentFingerprint,
      childNumber
    )

    return {
      xprvBase58,
      xpubBase58,
    }

  }

  createMasterNode() {

    const mnemonic = this.createMnemonic(12)
    const seed = this.createSeedFromMnemonic(mnemonic)
    const { masterKey, chainCode } = this.createMasterKey(seed)
    const xprv = this.createExtendedPrivateKey(masterKey, chainCode)
    const publicKey = this.createPublicKey(masterKey)
    const xpub = this.createExtendedPublicKey(publicKey, chainCode)
    
    // wallet bip44
    const walletBip44 = this.deriveFromPath(masterKey, chainCode, "m/44'/0'/0'/0/0")
        
    return {
      mnemonic,
      seed: seed.toString('hex'),
      masterKey,
      xpub,
      xprv,
      walletBip44
    }
  }

}

// end