'use client'

import KeyService from '@/services/key/key.service';
import { useState } from 'react';

export default function GeneratePrivateKeyButton() {
  const [privateKey, setPrivateKey] = useState<string>('')
  const [publicKey, setPublicKey] = useState<string>('')
  const [wif, setWif] = useState<string>('')
  const [base58Wif, setBase58Wif] = useState<string>('')  
  const [btcAddress, setBtcAddress] = useState<string>('')
  const [mnemonic, setMnemonic] = useState<string>('')
  const [seed, setSeed] = useState<string>('')

  const handleGeneratePrivateKey = () => {
    const keyService = new KeyService()
    const {xpub, xprv, mnemonic, seed } = keyService.createMasterNode()    
    const wif = keyService.createWIF(xprv)
    const base58Wif = keyService.encodeBase58(wif)
    const btcAddress = keyService.generateBTCAddress(Buffer.from(xpub, 'hex'))
    setWif(wif.toString('hex'))
    setBase58Wif(base58Wif)
    setPrivateKey(xprv)
    setPublicKey(xpub)
    setMnemonic(mnemonic)  
    setSeed(seed.toString('hex'))
    setBtcAddress(btcAddress)
  }

return (
  <div className='p-2 flex flex-col items-center justify-center space-y-2 font-mono'>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleGeneratePrivateKey}
    >
      Generate Private Key
    </button>
    <div className='p-2 rounded bg-black/10 flex flex-col items-center justify-center'>  
    <p className="text-gray-800">Seed: </p><p>
      {seed}
    </p>
    </div>
    <div className='p-2 rounded bg-black/10 flex flex-col items-center justify-center'>
    <p className="text-gray-800">Private Key: </p><p>{privateKey}</p>
    </div>
    <div className='p-2 rounded bg-black/10 flex flex-col items-center justify-center'>
    <p className="text-gray-800">Public key: </p><p>{publicKey}</p>
    </div>
    
    <div className='p-2 rounded bg-black/10 flex flex-col items-center justify-center'>  
    <p className="text-gray-800">WIF: </p><p>{wif}</p>
    </div>
    <div className='p-2 rounded bg-black/10 flex flex-col items-center justify-center'>
    <p className="text-gray-800">Base58 WIF: </p><p>{base58Wif}</p>
    </div>    
    <div className='p-2 rounded bg-black/10 flex flex-col items-center justify-center'>
    <p className="text-gray-800">BTC Address: </p><p>{btcAddress}</p>
    </div>
    <div className='p-2 rounded bg-black/10 flex flex-col items-center justify-center'>
    <p className="text-gray-800">Mnemonic: </p><p>{mnemonic}</p>
    </div>
  </div>
)

}