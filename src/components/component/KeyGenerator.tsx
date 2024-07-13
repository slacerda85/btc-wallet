'use client'

import KeyService, { MasterNodeResponse } from '@/services/bitcoin/key/key.service';
import { useState } from 'react';

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ExtendedKeysTabs } from './extended-keys-tabs';

export function KeyGenerator() {
  const [masterNode, setMasterNode] = useState<MasterNodeResponse>({} as MasterNodeResponse)
  
  const handleGeneratePrivateKey = () => {
    const keyService = new KeyService()
    const {
      mnemonic,
      seed,
      masterKey,
      wallets
    } = keyService.createMasterNode()    
    setMasterNode({
      mnemonic,
      seed,
      masterKey,
      wallets
    })
  }
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">Crypto Key Generator</h1>
        <Button onClick={handleGeneratePrivateKey}>Generate Keys</Button>
      </header>
      <main className="flex-1 p-6 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1 sm:grid-cols-1 md:grid-cols-2">
              <Label htmlFor="mnemonic">Mnemonic</Label>
              <Textarea
                id="mnemonic"
                readOnly
                // rows={1}
                value={masterNode?.mnemonic}
                className="sm:col-span-1 md:col-span-2"
              />
            </div>
            <div className="grid gap-1 sm:grid-cols-1 md:grid-cols-2">
              <Label htmlFor="bip32-seed">BIP32 Seed</Label>
              <Textarea
                id="bip32-seed"
                readOnly
                // rows={1}
                value={masterNode?.seed}
                className="sm:col-span-1 md:col-span-2"
              />
            </div>
            <div className="grid gap-1 sm:grid-cols-1 md:grid-cols-2">
              <Label htmlFor="bip32-seed">BIP32 master key</Label>
              <Textarea
                id="bip32-seed"
                readOnly
                // rows={1}
                value={masterNode?.masterKey?.toString('hex') || ''}
                className="sm:col-span-1 md:col-span-2"
              />
            </div>           
          </CardContent>
        </Card>
        <ExtendedKeysTabs wallets={masterNode?.wallets} />
      </main>
    </div>
  )
}
