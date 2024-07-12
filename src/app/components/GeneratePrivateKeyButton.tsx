'use client'

import KeyService from '@/services/bitcoin/key/key.service';
import { useState } from 'react';
import Image from 'next/image';

export default function GeneratePrivateKeyButton() {
  const [masterNode, setMasterNode] = useState<any>(null)
  
  const handleGeneratePrivateKey = () => {
    const keyService = new KeyService()
    const {
      mnemonic,
      seed,
      masterKey,
      xpub,
      xprv,
      wallet0,
      wallet1    
    } = keyService.createMasterNode()    
    setMasterNode({
      mnemonic,
      seed,
      masterKey: masterKey.toString('hex'),
      xpub,
      xprv,
      wallet0: {
        key: wallet0.key,
        xpub: wallet0.xpub,
        xprv: wallet0.xprv,
      }, 
      wallet1: {
        key: wallet1.key,
        xpub: wallet1.xpub,
        xprv: wallet1.xprv,
      }
    })
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
      <p className='text-lg font-bold'>Master Node</p>
      <p className='text-sm'>mnemonic: {masterNode?.mnemonic}</p>
      <p className='text-sm'>Bip39 seed: </p>
      <p>{masterNode?.seed}</p>
      <div className='text-sm'>masterKey: {masterNode?.masterKey}</div>
      <div className='text-sm'>xpub: {masterNode?.xpub}</div>
      <div className='text-sm'>Root key (xprv): {masterNode?.xprv}</div> 
      <div className='p-2 rounded bg-black/20 flex flex-col items-center justify-center'>
        <div className='text-lg font-bold'>Wallet 0 (chain m/0H)</div>
        <div className='text-sm'>key: {masterNode?.wallet0.key}</div>
        <div className='text-sm'>xpub: {masterNode?.wallet0.xpub}</div>
        <div className='text-sm'>xprv: {masterNode?.wallet0.xprv}</div>
      </div>
      <div className='p-2 rounded bg-black/20 flex flex-col items-center justify-center'>
        <div className='text-lg font-bold'>Wallet 1 (chain m/0H/1)</div>
        <div className='text-sm'>key: {masterNode?.wallet1.key}</div>
        <div className='text-sm'>xpub: {masterNode?.wallet1.xpub}</div>
        <div className='text-sm'>xprv: {masterNode?.wallet1.xprv}</div>
      </div>   
    </div>
    <Image src='/derivation.png' width={800} height={500} alt={''} />
  </div>
)

}