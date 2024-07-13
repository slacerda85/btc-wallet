import KeyService from '@/services/bitcoin/key/key.service';

import testVectors from './test-vectors';
import AddressService from '@/services/bitcoin/address/address.service';

const sut = new KeyService();

describe('KeyService', () => {  

  describe('Generate BIP32 "HD Wallets" key pair for all vectors (xpub, xprv)', () => {
    testVectors.forEach((testVector, index) => {
      if (index === 4) return // skip BIP84 test vector
      describe(`Test Vector ${index + 1}`, () => {
        let masterKey: Buffer;
        let chainCode: Buffer;
        
        if (testVector.seed !== undefined) {
          const seed = Buffer.from(testVector.seed, 'hex');
          const { masterKey: key, chainCode: chain } = sut.createMasterKey(seed);
          masterKey = key;
          chainCode = chain;
        } else if (testVector.mnemonic !== undefined) {
          const seed = sut.createSeedFromMnemonic(testVector.mnemonic);
          const { masterKey: key, chainCode: chain } = sut.createMasterKey(seed);
          masterKey = key;
          chainCode = chain;
        }

        Object.keys(testVector.chains).forEach((path) => {
          test(`Path: ${path}`, () => {
            const { privKey, pubKey } = sut.deriveFromPath(masterKey, chainCode, path)
            expect(privKey).toBe(testVector.chains[path].privKey)
            expect(pubKey).toBe(testVector.chains[path].pubKey)
          })

          if (testVector.chains[path].address !== undefined) {
            test('if vector has address, derive address from path', () => {
              const { pubKey } = sut.deriveFromPath(masterKey, chainCode, path)
              const addressService = new AddressService();
              const hrp = 'bc';
              const enc = addressService.encodings.BECH32;
              const address = addressService.encode(hrp, pubKey, enc)
              expect(address).toBe(testVector.chains[path].address)
            })
          }
        })
      });
    });
  })

  /* describe('Generate keypair from BIP84 test vector', () => {
    const testVector = testVectors[4];
    let masterKey: Buffer;
    let chainCode: Buffer;

    if (testVector.seed !== undefined) {
      const seed = Buffer.from(testVector.seed, 'hex');
      const { masterKey: key, chainCode: chain } = keyService.createMasterKey(seed);
      masterKey = key;
      chainCode = chain;
    } else if (testVector.mnemonic !== undefined) {
      const seed = keyService.createSeedFromMnemonic(testVector.mnemonic);
      const { masterKey: key, chainCode: chain } = keyService.createMasterKey(seed);
      masterKey = key;
      chainCode = chain;
    }

    Object.keys(testVector.chains).forEach((path) => {
      test(`Path: ${path}`, () => {
        const { privKey, pubKey } = keyService.deriveFromPath(masterKey, chainCode, path, true)
        expect(privKey).toBe(testVector.chains[path].privKey)
        expect(pubKey).toBe(testVector.chains[path].pubKey)
      })

      if (testVector.chains[path].address !== undefined) {
        test('if vector has address, derive address from path', () => {
          const { pubKey } = keyService.deriveFromPath(masterKey, chainCode, path)
          const addressService = new AddressService();
          const hrp = 'bc';
          const enc = addressService.encodings.BECH32;
          const address = addressService.encode(hrp, pubKey, enc)
          expect(address).toBe(testVector.chains[path].address)
        }) 
      } 
    })
  })  */
})