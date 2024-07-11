import KeyService from '@/services/key/key.service';

import testVectors from './test-vectors';

describe('KeyService', () => {
  const keyService = new KeyService();

  testVectors.forEach((testVector, index) => {

    describe(`Test Vector ${index + 1}`, () => {
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
        describe(`Path: ${path}`, () => {          
          test('derive extended keypair (xpub, xprv)', () => {
          const { xprvBase58, xpubBase58 } = keyService.deriveFromPath(masterKey, chainCode, path)               
          expect(xprvBase58).toBe(testVector.chains[path].privKey)
          expect(xpubBase58).toBe(testVector.chains[path].pubKey)
          })

        });
      })
    });
  });
})