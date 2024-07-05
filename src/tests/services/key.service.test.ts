import KeyService from '@/services/key/key.service'

// bitcoin test seeds
// https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#test-vectors

const testVector1 = {
  seed: '000102030405060708090a0b0c0d0e0f',
  xprv: 'xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi',
  xpub: 'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8',
}

const testVector2 = {
  seed: 'fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542',
  xprv: 'xprv9s21ZrQH143K31xYSDQpPDxsXRTUcvj2iNHm5NUtrGiGG5e2DtALGdso3pGz6ssrdK4PFmM8NSpSBHNqPqm55Qn3LqFtT2emdEXVYsCzC2U',
  xpub: 'xpub661MyMwAqRbcFW31YEwpkMuc5THy2PSt5bDMsktWQcFF8syAmRUapSCGu8ED9W6oDMSgv6Zz8idoc4a6mr8BDzTJY47LJhkJ8UB7WEGuduB',
}

const testVector3 = {
  seed: '4b381541583be4423346c643850da4b320e46a87ae3d2a4e6da11eba819cd4acba45d239319ac14f863b8d5ab5a0d0c64d2e8a1e7d1457df2e5a3c51c73235be',
  xpriv: 'xprv9s21ZrQH143K25QhxbucbDDuQ4naNntJRi4KUfWT7xo4EKsHt2QJDu7KXp1A3u7Bi1j8ph3EGsZ9Xvz9dGuVrtHHs7pXeTzjuxBrCmmhgC6',
  xpub: 'xpub661MyMwAqRbcEZVB4dScxMAdx6d4nFc9nvyvH3v4gJL378CSRZiYmhRoP7mBy6gSPSCYk6SzXPTf3ND1cZAceL7SfJ1Z3GC8vBgp2epUt13'
}

const testVector4 = {
  seed: '3ddd5602285899a946114506157c7997e5444528f3003f6134712147db19b678',
  xpriv: 'xprv9s21ZrQH143K48vGoLGRPxgo2JNkJ3J3fqkirQC2zVdk5Dgd5w14S7fRDyHH4dWNHUgkvsvNDCkvAwcSHNAQwhwgNMgZhLtQC63zxwhQmRv',
  xpub: 'xpub661MyMwAqRbcGczjuMoRm6dXaLDEhW1u34gKenbeYqAix21mdUKJyuyu5F1rzYGVxyL6tmgBUAEPrEz92mBXjByMRiJdba9wpnN37RLLAXa'
}

describe('KeyService', () => {
  const keyService = new KeyService()

  test('createPrivateKey with test vector 1', () => {
    const seed = Buffer.from(testVector1.seed, 'hex')

    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const xprvBase58 = keyService.createExtendedPrivateKey(masterKey, chainCode)
    const xpubBase58 = keyService.createExtendedPublicKey(masterKey, chainCode)

    expect(xprvBase58).toBe(testVector1.xprv)
    expect(xpubBase58).toBe(testVector1.xpub)
  })

  test('createPrivateKey with test vector 2', () => {
    const seed = Buffer.from(testVector2.seed, 'hex')

    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const xprvBase58 = keyService.createExtendedPrivateKey(masterKey, chainCode)
    const xpubBase58 = keyService.createExtendedPublicKey(masterKey, chainCode)

    expect(xprvBase58).toBe(testVector2.xprv)
    expect(xpubBase58).toBe(testVector2.xpub)
  })

  test('createPrivateKey with test vector 3', () => {
    const seed = Buffer.from(testVector3.seed, 'hex')

    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const xprvBase58 = keyService.createExtendedPrivateKey(masterKey, chainCode)
    const xpubBase58 = keyService.createExtendedPublicKey(masterKey, chainCode)

    expect(xprvBase58).toBe(testVector3.xpriv)
    expect(xpubBase58).toBe(testVector3.xpub)
  })

  test('createPrivateKey with test vector 4', () => {
    const seed = Buffer.from(testVector4.seed, 'hex')

    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const xprvBase58 = keyService.createExtendedPrivateKey(masterKey, chainCode)
    const xpubBase58 = keyService.createExtendedPublicKey(masterKey, chainCode)

    expect(xprvBase58).toBe(testVector4.xpriv)
    expect(xpubBase58).toBe(testVector4.xpub)
  })
})