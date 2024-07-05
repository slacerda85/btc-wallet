// begin
import { createHash, randomBytes, createHmac } from 'crypto'
import base58 from 'bs58'
import secp256k1 from 'secp256k1'
import wordList from 'bip39/src/wordlists/english.json'
import { entropyToMnemonic, mnemonicToSeedSync } from 'bip39'


export default class KeyService {

  // Helper functions
  generateMnemonic(numberOfWords: 12 | 24) {
    const bytes = numberOfWords === 12 ? 16 : 32
    const entropy = this.createEntropy(bytes)
    const mnemonic = entropyToMnemonic(entropy, wordList)
    return mnemonic
  }

  generateSeedFromMnemonic(mnemonic: string) {
    const seed = mnemonicToSeedSync(mnemonic)
    return seed
  }

  createEntropy(bytes: number = 16) {
    const entropy = randomBytes(bytes)
    return entropy
  }

  generateExtendedSeed(seed: Buffer) {
    const hmacSeed = createHmac('sha512', Buffer.from('Bitcoin seed', 'utf8')).update(seed).digest()
    return hmacSeed
  }

  encodeBase58(data: Buffer) {
    return base58.encode(data)
  }

  hash160(buffer: Buffer) {
    const sha256Hash = createHash('sha256').update(buffer).digest();
    return createHash('ripemd160').update(sha256Hash).digest();
  }

  sha256(buffer: Buffer) {
    return createHash('sha256').update(buffer).digest();
  }

  createChecksum(buffer: Buffer) {
    return this.sha256(this.sha256(buffer)).subarray(0, 4);
  }

  toHardenedIndex(i: number): number {
    const HARDENED_OFFSET = 0x80000000; // This is 2^31 in hexadecimal
    return i + HARDENED_OFFSET;
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

  generateBTCAddress(publicKey: Buffer) {

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

  createExtendedPrivateKey(masterKey: Buffer, chainCode: Buffer) {

    const xprvPrefix = 0x0488ADE4 // xprv

    const xprv = Buffer.allocUnsafe(78)
    xprv.writeUInt32BE(xprvPrefix, 0) // 4 bytes - xprv
    xprv.writeUInt8(0, 4) // 1 byte - depth
    xprv.writeUInt32BE(0, 5) // 4 bytes - parent fingerprint
    xprv.writeUInt32BE(0, 9) // 4 bytes - child number
    chainCode.copy(xprv, 13) // 32 bytes - chain code
    xprv.writeUInt8(0, 45) // 1 byte - private key padding
    masterKey.copy(xprv, 46) // 32 bytes - private key
    const xprvChecksum = this.createChecksum(xprv)
    const xprvAddress = Buffer.concat([xprv, xprvChecksum])
    const xprvBase58 = base58.encode(xprvAddress)

    return xprvBase58
  }

  createExtendedPublicKey(privateKey: Buffer, chainCode: Buffer): string {

    const xpubPrefix = 0x0488B21E // xpub
    // public key
    const publicKey = secp256k1.publicKeyCreate(privateKey, true)
    const xpub = Buffer.allocUnsafe(78)
    xpub.writeUInt32BE(xpubPrefix, 0) // 4 bytes
    xpub.writeUInt8(0, 4) // 1 byte - depth
    xpub.writeUInt32BE(0, 5) // 4 bytes - parent fingerprint, 0 for master node
    xpub.writeUInt32BE(0, 9) // 4 bytes - child number
    Buffer.from(chainCode).copy(xpub, 13) // 32 bytes - chain code
    // add public key to buffer, no padding. publicKey isUint8Array, convert to Buffer
    Buffer.from(publicKey).copy(xpub, 45) // 32 bytes - public key
    const xpubChecksum = this.createChecksum(xpub)
    const xpubAddress = Buffer.concat([xpub, xpubChecksum])
    const xpubBase58 = base58.encode(xpubAddress)

    return xpubBase58
  }

  generateMasterKey(seed: Buffer) {
    let extendedSeed
    let masterKey

    do {
      extendedSeed = this.generateExtendedSeed(seed)
      masterKey = extendedSeed.subarray(0, 32)
    } while (!secp256k1.privateKeyVerify(masterKey))

    const chainCode = extendedSeed.subarray(32)

    return { masterKey, chainCode }
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
    : secp256k1.publicKeyCreate(masterKey, true)

    const data = Buffer.concat([privateKeyPadding, key, indexBuffer])
    const hmac = createHmac('sha512', chainCode).update(data).digest()
    const derivedKey = hmac.subarray(0, 32)
    const derivedChainCode = hmac.subarray(32)
    const parsedDerivedKey = BigInt(`0x${derivedKey.toString('hex')}`)
    const parsedMasterKey = BigInt(`0x${masterKey.toString('hex')}`)
    const newKey = (parsedDerivedKey + parsedMasterKey) % n

    if (newKey === BigInt(0)) {
     throw new Error('Invalid key')
    }

    const childKey = Buffer.from(newKey.toString(16).padStart(64, '0'), 'hex')

    return { childKey, derivedChainCode }
  }

  createMasterNode() {

    const mnemonic = this.generateMnemonic(12)
    const seed = this.generateSeedFromMnemonic(mnemonic)
    const { masterKey, chainCode } = this.generateMasterKey(seed)
    const xprv = this.createExtendedPrivateKey(masterKey, chainCode)
    const xpub = this.createExtendedPublicKey(masterKey, chainCode)

    return {
      xpub,
      xprv,
      mnemonic,
      seed,
    }
  }

}

// end