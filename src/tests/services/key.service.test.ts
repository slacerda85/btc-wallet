import KeyService from '@/services/key/key.service'

// bitcoin test seeds
// https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#test-vectors

const testVector1 = {
  seed: '000102030405060708090a0b0c0d0e0f',
  chains: {
    m: {
      xpub: 'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8',
      xprv: 'xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi',
    },
    m0h: {
      xpub: 'xpub68Gmy5EdvgibQVfPdqkBBCHxA5htiqg55crXYuXoQRKfDBFA1WEjWgP6LHhwBZeNK1VTsfTFUHCdrfp1bgwQ9xv5ski8PX9rL2dZXvgGDnw',
      xprv: 'xprv9uHRZZhk6KAJC1avXpDAp4MDc3sQKNxDiPvvkX8Br5ngLNv1TxvUxt4cV1rGL5hj6KCesnDYUhd7oWgT11eZG7XnxHrnYeSvkzY7d2bhkJ7',
    },
    m0h1: {
      xpub: 'xpub6ASuArnXKPbfEwhqN6e3mwBcDTgzisQN1wXN9BJcM47sSikHjJf3UFHKkNAWbWMiGj7Wf5uMash7SyYq527Hqck2AxYysAA7xmALppuCkwQ',
      xprv: 'xprv9wTYmMFdV23N2TdNG573QoEsfRrWKQgWeibmLntzniatZvR9BmLnvSxqu53Kw1UmYPxLgboyZQaXwTCg8MSY3H2EU4pWcQDnRnrVA1xe8fs',
    },
    m0h12h: {
      xpub: 'xpub6D4BDPcP2GT577Vvch3R8wDkScZWzQzMMUm3PWbmWvVJrZwQY4VUNgqFJPMM3No2dFDFGTsxxpG5uJh7n7epu4trkrX7x7DogT5Uv6fcLW5',
      xprv: 'xprv9z4pot5VBttmtdRTWfWQmoH1taj2axGVzFqSb8C9xaxKymcFzXBDptWmT7FwuEzG3ryjH4ktypQSAewRiNMjANTtpgP4mLTj34bhnZX7UiM',
    },
    m0h12h2: {
      xpub: 'xpub6FHa3pjLCk84BayeJxFW2SP4XRrFd1JYnxeLeU8EqN3vDfZmbqBqaGJAyiLjTAwm6ZLRQUMv1ZACTj37sR62cfN7fe5JnJ7dh8zL4fiyLHV',
      xprv: 'xprvA2JDeKCSNNZky6uBCviVfJSKyQ1mDYahRjijr5idH2WwLsEd4Hsb2Tyh8RfQMuPh7f7RtyzTtdrbdqqsunu5Mm3wDvUAKRHSC34sJ7in334',
    },
    m0h12h2100000000: {
      xpub: 'xpub6H1LXWLaKsWFhvm6RVpEL9P4KfRZSW7abD2ttkWP3SSQvnyA8FSVqNTEcYFgJS2UaFcxupHiYkro49S8yGasTvXEYBVPamhGW6cFJodrTHy',
      xprv: 'xprvA41z7zogVVwxVSgdKUHDy1SKmdb533PjDz7J6N6mV6uS3ze1ai8FHa8kmHScGpWmj4WggLyQjgPie1rFSruoUihUZREPSL39UNdE3BBDu76',
    }
  }
}

const testVector2 = {
  seed: 'fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542',
  chains: {
    m: {
      xpub: 'xpub661MyMwAqRbcFW31YEwpkMuc5THy2PSt5bDMsktWQcFF8syAmRUapSCGu8ED9W6oDMSgv6Zz8idoc4a6mr8BDzTJY47LJhkJ8UB7WEGuduB',
      xprv: 'xprv9s21ZrQH143K31xYSDQpPDxsXRTUcvj2iNHm5NUtrGiGG5e2DtALGdso3pGz6ssrdK4PFmM8NSpSBHNqPqm55Qn3LqFtT2emdEXVYsCzC2U'
    },
    'm/0': {
      xpub: 'xpub69H7F5d8KSRgmmdJg2KhpAK8SR3DjMwAdkxj3ZuxV27CprR9LgpeyGmXUbC6wb7ERfvrnKZjXoUmmDznezpbZb7ap6r1D3tgFxHmwMkQTPH',
      xprv: 'xprv9vHkqa6EV4sPZHYqZznhT2NPtPCjKuDKGY38FBWLvgaDx45zo9WQRUT3dKYnjwih2yJD9mkrocEZXo1ex8G81dwSM1fwqWpWkeS3v86pgKt'
    },
    'm/0/2147483647H': {
      xpub: 'xpub6ASAVgeehLbnwdqV6UKMHVzgqAG8Gr6riv3Fxxpj8ksbH9ebxaEyBLZ85ySDhKiLDBrQSARLq1uNRts8RuJiHjaDMBU4Zn9h8LZNnBC5y4a',
      xprv: 'xprv9wSp6B7kry3Vj9m1zSnLvN3xH8RdsPP1Mh7fAaR7aRLcQMKTR2vidYEeEg2mUCTAwCd6vnxVrcjfy2kRgVsFawNzmjuHc2YmYRmagcEPdU9'
    },
    'm/0/2147483647H/1': {
      xpub: 'xpub6DF8uhdarytz3FWdA8TvFSvvAh8dP3283MY7p2V4SeE2wyWmG5mg5EwVvmdMVCQcoNJxGoWaU9DCWh89LojfZ537wTfunKau47EL2dhHKon',
      xprv: 'xprv9zFnWC6h2cLgpmSA46vutJzBcfJ8yaJGg8cX1e5StJh45BBciYTRXSd25UEPVuesF9yog62tGAQtHjXajPPdbRCHuWS6T8XA2ECKADdw4Ef'
    },
    'm/0/2147483647H/1/2147483646H': {
      xpub: 'xpub6ERApfZwUNrhLCkDtcHTcxd75RbzS1ed54G1LkBUHQVHQKqhMkhgbmJbZRkrgZw4koxb5JaHWkY4ALHY2grBGRjaDMzQLcgJvLJuZZvRcEL',
      xprv: 'xprvA1RpRA33e1JQ7ifknakTFpgNXPmW2YvmhqLQYMmrj4xJXXWYpDPS3xz7iAxn8L39njGVyuoseXzU6rcxFLJ8HFsTjSyQbLYnMpCqE2VbFWc'
    },
    'm/0/2147483647H/1/2147483646H/2': {
      xpub: 'xpub6FnCn6nSzZAw5Tw7cgR9bi15UV96gLZhjDstkXXxvCLsUXBGXPdSnLFbdpq8p9HmGsApME5hQTZ3emM2rnY5agb9rXpVGyy3bdW6EEgAtqt',
      xprv: 'xprvA2nrNbFZABcdryreWet9Ea4LvTJcGsqrMzxHx98MMrotbir7yrKCEXw7nadnHM8Dq38EGfSh6dqA9QWTyefMLEcBYJUuekgW4BYPJcr9E7j'
    },
  }
}

const testVector3 = {
  seed: '4b381541583be4423346c643850da4b320e46a87ae3d2a4e6da11eba819cd4acba45d239319ac14f863b8d5ab5a0d0c64d2e8a1e7d1457df2e5a3c51c73235be',
  chains: {
    m: {
      xpub: 'xpub661MyMwAqRbcEZVB4dScxMAdx6d4nFc9nvyvH3v4gJL378CSRZiYmhRoP7mBy6gSPSCYk6SzXPTf3ND1cZAceL7SfJ1Z3GC8vBgp2epUt13',
      xprv: 'xprv9s21ZrQH143K25QhxbucbDDuQ4naNntJRi4KUfWT7xo4EKsHt2QJDu7KXp1A3u7Bi1j8ph3EGsZ9Xvz9dGuVrtHHs7pXeTzjuxBrCmmhgC6'
    },
    'm/0H': {
      xpub: 'xpub68NZiKmJWnxxS6aaHmn81bvJeTESw724CRDs6HbuccFQN9Ku14VQrADWgqbhhTHBaohPX4CjNLf9fq9MYo6oDaPPLPxSb7gwQN3ih19Zm4Y',
      xprv: 'xprv9uPDJpEQgRQfDcW7BkF7eTya6RPxXeJCqCJGHuCJ4GiRVLzkTXBAJMu2qaMWPrS7AANYqdq6vcBcBUdJCVVFceUvJFjaPdGZ2y9WACViL4L'
    },
  }
}

const testVector4 = {
  seed: '3ddd5602285899a946114506157c7997e5444528f3003f6134712147db19b678',
  chains: {
    m: {
      xpub: 'xpub661MyMwAqRbcGczjuMoRm6dXaLDEhW1u34gKenbeYqAix21mdUKJyuyu5F1rzYGVxyL6tmgBUAEPrEz92mBXjByMRiJdba9wpnN37RLLAXa',
      xprv: 'xprv9s21ZrQH143K48vGoLGRPxgo2JNkJ3J3fqkirQC2zVdk5Dgd5w14S7fRDyHH4dWNHUgkvsvNDCkvAwcSHNAQwhwgNMgZhLtQC63zxwhQmRv',
    },
    "m/0H": {
      xpub: 'xpub69AUMk3qDBi3uW1sXgjCmVjJ2G6WQoYSnNHyzkmdCHEhSZ4tBok37xfFEqHd2AddP56Tqp4o56AePAgCjYdvpW2PU2jbUPFKsav5ut6Ch1m',
      xprv: 'xprv9vB7xEWwNp9kh1wQRfCCQMnZUEG21LpbR9NPCNN1dwhiZkjjeGRnaALmPXCX7SgjFTiCTT6bXes17boXtjq3xLpcDjzEuGLQBM5ohqkao9G',
    },
    "m/0H/1H": {
      xpub: 'xpub6BJA1jSqiukeaesWfxe6sNK9CCGaujFFSJLomWHprUL9DePQ4JDkM5d88n49sMGJxrhpjazuXYWdMf17C9T5XnxkopaeS7jGk1GyyVziaMt',
      xprv: 'xprv9xJocDuwtYCMNAo3Zw76WENQeAS6WGXQ55RCy7tDJ8oALr4FWkuVoHJeHVAcAqiZLE7Je3vZJHxspZdFHfnBEjHqU5hG1Jaj32dVoS6XLT1',
    },
    // other chains
  }
}

describe('KeyService', () => {
  const keyService = new KeyService()

  test('createPrivateKey with test vector 1', () => {
    const seed = Buffer.from(testVector1.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const publicKey = keyService.createPublicKey(masterKey)
    const xprvBase58 = keyService.createExtendedPrivateKey(masterKey, chainCode)
    const xpubBase58 = keyService.createExtendedPublicKey(publicKey, chainCode)
    expect(xprvBase58).toBe(testVector1.chains.m.xprv)
    expect(xpubBase58).toBe(testVector1.chains.m.xpub)
  })

  test('deriveChildPrivateKey with test vector 1 ( Chain m/0h)', () => {
    const seed = Buffer.from(testVector1.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const hardenedIndex = keyService.createHardenedIndex(0)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, hardenedIndex)
    const parentPublicKey = keyService.createPublicKey(masterKey)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const xprvBase58 = keyService
      .createExtendedPrivateKey(childKey, derivedChainCode, 1, parentFingerprint, hardenedIndex)
    expect(xprvBase58).toBe(testVector1.chains.m0h.xprv)
  }
  )

  test('derive child public key with test vector 1 (Chain m/0h)', () => {
    const seed = Buffer.from(testVector1.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const hardenedIndex = keyService.createHardenedIndex(0)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, hardenedIndex)
    const parentPublicKey = keyService.createPublicKey(masterKey)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const childPublicKey = keyService.createPublicKey(childKey)
    const xpubBase58 = keyService
      .createExtendedPublicKey(childPublicKey, derivedChainCode, 1, parentFingerprint, hardenedIndex)
    expect(xpubBase58).toBe(testVector1.chains.m0h.xpub)
  })

  test('derive child private key with test vector 1 (Chain m/0h/1)', () => {
    const seed = Buffer.from(testVector1.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0h
    const hardenedIndex = keyService.createHardenedIndex(0)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, hardenedIndex)
    // derive m/0h/1
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 1)
    const parentPublicKey = keyService.createPublicKey(childKey)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const xprvBase58 = keyService
      .createExtendedPrivateKey(childKey1, derivedChainCode1, 2, parentFingerprint, 1)
    expect(xprvBase58).toBe(testVector1.chains.m0h1.xprv)
  })

  test('derive child public key with test vector 1 (Chain m/0h/1)', () => {
    const seed = Buffer.from(testVector1.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0h
    const hardenedIndex = keyService.createHardenedIndex(0)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, hardenedIndex)
    // derive m/0h/1
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 1)
    const parentPublicKey = keyService.createPublicKey(childKey)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const childPublicKey = keyService.createPublicKey(childKey1)
    const xpubBase58 = keyService
      .createExtendedPublicKey(childPublicKey, derivedChainCode1, 2, parentFingerprint, 1)
    expect(xpubBase58).toBe(testVector1.chains.m0h1.xpub)
  })

  test('derive child private key with test vector 1 (Chain m/0h/1/2h)', () => {
    const seed = Buffer.from(testVector1.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0h
    const hardIndex0 = keyService.createHardenedIndex(0)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, hardIndex0)
    // derive m/0h/1
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 1)
    // derive m/0h/1/2h
    const hardIndex2 = keyService.createHardenedIndex(2)
    const { childKey: childKey2, derivedChainCode: derivedChainCode2 } = keyService
      .deriveChildPrivateKey(childKey1, derivedChainCode1, hardIndex2)

    const parentPublicKey = keyService.createPublicKey(childKey1)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)

    const xprvBase58 = keyService
      .createExtendedPrivateKey(childKey2, derivedChainCode2, 3, parentFingerprint, hardIndex2)
    expect(xprvBase58).toBe(testVector1.chains.m0h12h.xprv)
  })

  test('derive child public key with test vector 1 (Chain m/0h/1/2h)', () => {
    const seed = Buffer.from(testVector1.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0h
    const hardIndex0 = keyService.createHardenedIndex(0)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, hardIndex0)
    // derive m/0h/1
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 1)
    // derive m/0h/1/2h
    const hardIndex2 = keyService.createHardenedIndex(2)
    const { childKey: childKey2, derivedChainCode: derivedChainCode2 } = keyService
      .deriveChildPrivateKey(childKey1, derivedChainCode1, hardIndex2)
    const parentPublicKey = keyService.createPublicKey(childKey1)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const childPublicKey = keyService.createPublicKey(childKey2)
    const xpubBase58 = keyService
      .createExtendedPublicKey(childPublicKey, derivedChainCode2, 3, parentFingerprint, hardIndex2)
    expect(xpubBase58).toBe(testVector1.chains.m0h12h.xpub)
  })

  test('derive child private key with test vector 1 (Chain m/0h/1/2h/2)', () => {
    const seed = Buffer.from(testVector1.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0h
    const hardIndex0 = keyService.createHardenedIndex(0)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, hardIndex0)
    // derive m/0h/1
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 1)
    // derive m/0h/1/2h
    const hardIndex2 = keyService.createHardenedIndex(2)
    const { childKey: childKey2, derivedChainCode: derivedChainCode2 } = keyService
      .deriveChildPrivateKey(childKey1, derivedChainCode1, hardIndex2)
    // derive m/0h/1/2h/2
    const { childKey: childKey3, derivedChainCode: derivedChainCode3 } = keyService
      .deriveChildPrivateKey(childKey2, derivedChainCode2, 2)
    const parentPublicKey = keyService.createPublicKey(childKey2)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const xprvBase58 = keyService
      .createExtendedPrivateKey(childKey3, derivedChainCode3, 4, parentFingerprint, 2)
    expect(xprvBase58).toBe(testVector1.chains.m0h12h2.xprv)
  })

  test('derive child public key with test vector 1 (Chain m/0h/1/2h/2)', () => {
    const seed = Buffer.from(testVector1.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0h
    const hardIndex0 = keyService.createHardenedIndex(0)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, hardIndex0)
    // derive m/0h/1
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 1)
    // derive m/0h/1/2h
    const hardIndex2 = keyService.createHardenedIndex(2)
    const { childKey: childKey2, derivedChainCode: derivedChainCode2 } = keyService
      .deriveChildPrivateKey(childKey1, derivedChainCode1, hardIndex2)
    // derive m/0h/1/2h/2
    const { childKey: childKey3, derivedChainCode: derivedChainCode3 } = keyService
      .deriveChildPrivateKey(childKey2, derivedChainCode2, 2)
    const parentPublicKey = keyService.createPublicKey(childKey2)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const childPublicKey = keyService.createPublicKey(childKey3)
    const xpubBase58 = keyService
      .createExtendedPublicKey(childPublicKey, derivedChainCode3, 4, parentFingerprint, 2)
    expect(xpubBase58).toBe(testVector1.chains.m0h12h2.xpub)
  })

  test('derive child private key with test vector 1 (Chain m/0h/1/2h/2/1000000000)', () => {
    const seed = Buffer.from(testVector1.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0h
    const hardIndex0 = keyService.createHardenedIndex(0)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, hardIndex0)
    // derive m/0h/1
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 1)
    // derive m/0h/1/2h
    const hardIndex2 = keyService.createHardenedIndex(2)
    const { childKey: childKey2, derivedChainCode: derivedChainCode2 } = keyService
      .deriveChildPrivateKey(childKey1, derivedChainCode1, hardIndex2)
    // derive m/0h/1/2h/2
    const { childKey: childKey3, derivedChainCode: derivedChainCode3 } = keyService
      .deriveChildPrivateKey(childKey2, derivedChainCode2, 2)
    // derive m/0h/1/2h/2/1000000000
    const index = 1000000000
    const { childKey: childKey4, derivedChainCode: derivedChainCode4 } = keyService
      .deriveChildPrivateKey(childKey3, derivedChainCode3, index)
    const parentPublicKey = keyService.createPublicKey(childKey3)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const xprvBase58 = keyService
      .createExtendedPrivateKey(childKey4, derivedChainCode4, 5, parentFingerprint, index)
    expect(xprvBase58).toBe(testVector1.chains.m0h12h2100000000.xprv)
  })

  test('derive child public key with test vector 1 (Chain m/0h/1/2h/2/1000000000)', () => {
    const seed = Buffer.from(testVector1.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0h
    const hardIndex0 = keyService.createHardenedIndex(0)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, hardIndex0)
    // derive m/0h/1
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 1)
    // derive m/0h/1/2h
    const hardIndex2 = keyService.createHardenedIndex(2)
    const { childKey: childKey2, derivedChainCode: derivedChainCode2 } = keyService
      .deriveChildPrivateKey(childKey1, derivedChainCode1, hardIndex2)
    // derive m/0h/1/2h/2
    const { childKey: childKey3, derivedChainCode: derivedChainCode3 } = keyService
      .deriveChildPrivateKey(childKey2, derivedChainCode2, 2)
    // derive m/0h/1/2h/2/1000000000
    const index = 1000000000
    const { childKey: childKey4, derivedChainCode: derivedChainCode4 } = keyService
      .deriveChildPrivateKey(childKey3, derivedChainCode3, index)
    const parentPublicKey = keyService.createPublicKey(childKey3)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const childPublicKey = keyService.createPublicKey(childKey4)
    const xpubBase58 = keyService
      .createExtendedPublicKey(childPublicKey, derivedChainCode4, 5, parentFingerprint, index)
    expect(xpubBase58).toBe(testVector1.chains.m0h12h2100000000.xpub)
  })

  test('createPrivateKey with test vector 2', () => {
    const seed = Buffer.from(testVector2.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const publicKey = keyService.createPublicKey(masterKey)
    const xprvBase58 = keyService.createExtendedPrivateKey(masterKey, chainCode)
    const xpubBase58 = keyService.createExtendedPublicKey(publicKey, chainCode)
    expect(xprvBase58).toBe(testVector2.chains.m.xprv)
    expect(xpubBase58).toBe(testVector2.chains.m.xpub)
  })

  test('derive child private key with test vector 2 (Chain m/0)', () => {
    const seed = Buffer.from(testVector2.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, 0)
    const parentPublicKey = keyService.createPublicKey(masterKey)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const xprvBase58 = keyService
      .createExtendedPrivateKey(childKey, derivedChainCode, 1, parentFingerprint, 0)
    expect(xprvBase58).toBe(testVector2.chains['m/0'].xprv)
  })

  test('derive child public key with test vector 2 (Chain m/0)', () => {
    const seed = Buffer.from(testVector2.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, 0)
    const parentPublicKey = keyService.createPublicKey(masterKey)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const childPublicKey = keyService.createPublicKey(childKey)
    const xpubBase58 = keyService
      .createExtendedPublicKey(childPublicKey, derivedChainCode, 1, parentFingerprint, 0)
    expect(xpubBase58).toBe(testVector2.chains['m/0'].xpub)
  })

  test('derive child private key with test vector 2 (Chain m/0/2147483647H)', () => {
    const seed = Buffer.from(testVector2.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, 0)
    // derive m/0/2147483647H
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 2147483647 + 0x80000000)
    const parentPublicKey = keyService.createPublicKey(childKey)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const xprvBase58 = keyService
      .createExtendedPrivateKey(childKey1, derivedChainCode1, 2, parentFingerprint, 2147483647 + 0x80000000)
    expect(xprvBase58).toBe(testVector2.chains['m/0/2147483647H'].xprv)
  })

  test('derive child public key with test vector 2 (Chain m/0/2147483647H)', () => {
    const seed = Buffer.from(testVector2.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, 0)
    // derive m/0/2147483647H
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 2147483647 + 0x80000000)
    const parentPublicKey = keyService.createPublicKey(childKey)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const childPublicKey = keyService.createPublicKey(childKey1)
    const xpubBase58 = keyService
      .createExtendedPublicKey(childPublicKey, derivedChainCode1, 2, parentFingerprint, 2147483647 + 0x80000000)
    expect(xpubBase58).toBe(testVector2.chains['m/0/2147483647H'].xpub)
  })

  test('derive child private key with test vector 2 (Chain m/0/2147483647H/1)', () => {
    const seed = Buffer.from(testVector2.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, 0)
    // derive m/0/2147483647H
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 2147483647 + 0x80000000)
    // derive m/0/2147483647H/1
    const { childKey: childKey2, derivedChainCode: derivedChainCode2 } = keyService
      .deriveChildPrivateKey(childKey1, derivedChainCode1, 1)
    const parentPublicKey = keyService.createPublicKey(childKey1)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const xprvBase58 = keyService
      .createExtendedPrivateKey(childKey2, derivedChainCode2, 3, parentFingerprint, 1)
    expect(xprvBase58).toBe(testVector2.chains['m/0/2147483647H/1'].xprv)
  })

  test('derive child public key with test vector 2 (Chain m/0/2147483647H/1)', () => {
    const seed = Buffer.from(testVector2.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, 0)
    // derive m/0/2147483647H
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 2147483647 + 0x80000000)
    // derive m/0/2147483647H/1
    const { childKey: childKey2, derivedChainCode: derivedChainCode2 } = keyService
      .deriveChildPrivateKey(childKey1, derivedChainCode1, 1)
    const parentPublicKey = keyService.createPublicKey(childKey1)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const childPublicKey = keyService.createPublicKey(childKey2)
    const xpubBase58 = keyService
      .createExtendedPublicKey(childPublicKey, derivedChainCode2, 3, parentFingerprint, 1)
    expect(xpubBase58).toBe(testVector2.chains['m/0/2147483647H/1'].xpub)
  })

  test('derive child private key with test vector 2 (Chain m/0/2147483647H/1/2147483646H)', () => {
    const seed = Buffer.from(testVector2.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, 0)
    // derive m/0/2147483647H
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 2147483647 + 0x80000000)
    // derive m/0/2147483647H/1
    const { childKey: childKey2, derivedChainCode: derivedChainCode2 } = keyService
      .deriveChildPrivateKey(childKey1, derivedChainCode1, 1)
    // derive m/0/2147483647H/1/2147483646H
    const { childKey: childKey3, derivedChainCode: derivedChainCode3 } = keyService
      .deriveChildPrivateKey(childKey2, derivedChainCode2, 2147483646 + 0x80000000)
    const parentPublicKey = keyService.createPublicKey(childKey2)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const xprvBase58 = keyService
      .createExtendedPrivateKey(childKey3, derivedChainCode3, 4, parentFingerprint, 2147483646 + 0x80000000)
    expect(xprvBase58).toBe(testVector2.chains['m/0/2147483647H/1/2147483646H'].xprv)
  })

  test('derive child public key with test vector 2 (Chain m/0/2147483647H/1/2147483646H)', () => {
    const seed = Buffer.from(testVector2.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, 0)
    // derive m/0/2147483647H
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 2147483647 + 0x80000000)
    // derive m/0/2147483647H/1
    const { childKey: childKey2, derivedChainCode: derivedChainCode2 } = keyService
      .deriveChildPrivateKey(childKey1, derivedChainCode1, 1)
    // derive m/0/2147483647H/1/2147483646H
    const { childKey: childKey3, derivedChainCode: derivedChainCode3 } = keyService
      .deriveChildPrivateKey(childKey2, derivedChainCode2, 2147483646 + 0x80000000)
    const parentPublicKey = keyService.createPublicKey(childKey2)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const childPublicKey = keyService.createPublicKey(childKey3)
    const xpubBase58 = keyService
      .createExtendedPublicKey(childPublicKey, derivedChainCode3, 4, parentFingerprint, 2147483646 + 0x80000000)
    expect(xpubBase58).toBe(testVector2.chains['m/0/2147483647H/1/2147483646H'].xpub)
  })

  test('derive child private key with test vector 2 (Chain m/0/2147483647H/1/2147483646H/2)', () => {
    const seed = Buffer.from(testVector2.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, 0)
    // derive m/0/2147483647H
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 2147483647 + 0x80000000)
    // derive m/0/2147483647H/1
    const { childKey: childKey2, derivedChainCode: derivedChainCode2 } = keyService
      .deriveChildPrivateKey(childKey1, derivedChainCode1, 1)
    // derive m/0/2147483647H/1/2147483646H
    const { childKey: childKey3, derivedChainCode: derivedChainCode3 } = keyService
      .deriveChildPrivateKey(childKey2, derivedChainCode2, 2147483646 + 0x80000000)
    // derive m/0/2147483647H/1/2147483646H/2
    const { childKey: childKey4, derivedChainCode: derivedChainCode4 } = keyService
      .deriveChildPrivateKey(childKey3, derivedChainCode3, 2)
    const parentPublicKey = keyService.createPublicKey(childKey3)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const xprvBase58 = keyService
      .createExtendedPrivateKey(childKey4, derivedChainCode4, 5, parentFingerprint, 2)
    expect(xprvBase58).toBe(testVector2.chains['m/0/2147483647H/1/2147483646H/2'].xprv)
  })

  test('derive child public key with test vector 2 (Chain m/0/2147483647H/1/2147483646H/2)', () => {
    const seed = Buffer.from(testVector2.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, 0)
    // derive m/0/2147483647H
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, 2147483647 + 0x80000000)
    // derive m/0/2147483647H/1
    const { childKey: childKey2, derivedChainCode: derivedChainCode2 } = keyService
      .deriveChildPrivateKey(childKey1, derivedChainCode1, 1)
    // derive m/0/2147483647H/1/2147483646H
    const { childKey: childKey3, derivedChainCode: derivedChainCode3 } = keyService
      .deriveChildPrivateKey(childKey2, derivedChainCode2, 2147483646 + 0x80000000)
    // derive m/0/2147483647H/1/2147483646H/2
    const { childKey: childKey4, derivedChainCode: derivedChainCode4 } = keyService
      .deriveChildPrivateKey(childKey3, derivedChainCode3, 2)
    const parentPublicKey = keyService.createPublicKey(childKey3)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const childPublicKey = keyService.createPublicKey(childKey4)
    const xpubBase58 = keyService
      .createExtendedPublicKey(childPublicKey, derivedChainCode4, 5, parentFingerprint, 2)
    expect(xpubBase58).toBe(testVector2.chains['m/0/2147483647H/1/2147483646H/2'].xpub)
  })

  test('createPrivateKey with test vector 3', () => {
    const seed = Buffer.from(testVector3.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const publicKey = keyService.createPublicKey(masterKey)
    const xprvBase58 = keyService.createExtendedPrivateKey(masterKey, chainCode)
    const xpubBase58 = keyService.createExtendedPublicKey(publicKey, chainCode)
    expect(xprvBase58).toBe(testVector3.chains.m.xprv)
    expect(xpubBase58).toBe(testVector3.chains.m.xpub)
  })

  test('derive child private key with test vector 3 (Chain m/0H)', () => {
    const seed = Buffer.from(testVector3.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const hardenedIndex = keyService.createHardenedIndex(0)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, hardenedIndex)
    const parentPublicKey = keyService.createPublicKey(masterKey)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const xprvBase58 = keyService
      .createExtendedPrivateKey(childKey, derivedChainCode, 1, parentFingerprint, hardenedIndex)
    expect(xprvBase58).toBe(testVector3.chains['m/0H'].xprv)
  })

  // test retention of leading zeros in the public key
  test('derive child public key with test vector 3 (Chain m/0H)', () => {
    const seed = Buffer.from(testVector3.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const hardenedIndex = keyService.createHardenedIndex(0)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, hardenedIndex)
    const parentPublicKey = keyService.createPublicKey(masterKey)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const childPublicKey = keyService.createPublicKey(childKey)
    const xpubBase58 = keyService
      .createExtendedPublicKey(childPublicKey, derivedChainCode, 1, parentFingerprint, hardenedIndex)
    expect(xpubBase58).toBe(testVector3.chains['m/0H'].xpub)
  })

  test('create privateKey with test vector 4', () => {
    const seed = Buffer.from(testVector4.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const publicKey = keyService.createPublicKey(masterKey)
    const xprvBase58 = keyService.createExtendedPrivateKey(masterKey, chainCode)
    const xpubBase58 = keyService.createExtendedPublicKey(publicKey, chainCode)
    expect(xprvBase58).toBe(testVector4.chains.m.xprv)
    expect(xpubBase58).toBe(testVector4.chains.m.xpub)
  })

  test('derive child private key with test vector 4 (Chain m/0H)', () => {
    const seed = Buffer.from(testVector4.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const hardenedIndex = keyService.createHardenedIndex(0)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, hardenedIndex)
    const parentPublicKey = keyService.createPublicKey(masterKey)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const xprvBase58 = keyService
      .createExtendedPrivateKey(childKey, derivedChainCode, 1, parentFingerprint, hardenedIndex)
    expect(xprvBase58).toBe(testVector4.chains['m/0H'].xprv)
  })

  test('derive child public key with test vector 4 (Chain m/0H)', () => {
    const seed = Buffer.from(testVector4.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    const hardenedIndex = keyService.createHardenedIndex(0)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, hardenedIndex)
    const parentPublicKey = keyService.createPublicKey(masterKey)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const childPublicKey = keyService.createPublicKey(childKey)
    const xpubBase58 = keyService
      .createExtendedPublicKey(childPublicKey, derivedChainCode, 1, parentFingerprint, hardenedIndex)
    expect(xpubBase58).toBe(testVector4.chains['m/0H'].xpub)
  })

  test('derive child private key with test vector 4 (Chain m/0H/1H)', () => {
    const seed = Buffer.from(testVector4.seed, 'hex')
    const { masterKey, chainCode } = keyService.generateMasterKey(seed)
    // derive m/0H
    const hardIndex0 = keyService.createHardenedIndex(0)
    const { childKey, derivedChainCode } = keyService
      .deriveChildPrivateKey(masterKey, chainCode, hardIndex0)
    // derive m/0H/1H
    const hardIndex1 = keyService.createHardenedIndex(1)
    const { childKey: childKey1, derivedChainCode: derivedChainCode1 } = keyService
      .deriveChildPrivateKey(childKey, derivedChainCode, hardIndex1)
    const parentPublicKey = keyService.createPublicKey(childKey)
    const parentFingerprint = keyService.getParentFingerprint(parentPublicKey)
    const xprvBase58 = keyService
      .createExtendedPrivateKey(childKey1, derivedChainCode1, 2, parentFingerprint, hardIndex1)
    expect(xprvBase58).toBe(testVector4.chains['m/0H/1H'].xprv)
  })

})