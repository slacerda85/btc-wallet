'use client'

import KeyService from '@/services/key/key.service';
import { useState } from 'react';

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function KeyGenerator() {
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
                rows={3}
                value={masterNode?.mnemonic}
                className="sm:col-span-1 md:col-span-2"
              />
            </div>
            <div className="grid gap-1 sm:grid-cols-1 md:grid-cols-2">
              <Label htmlFor="bip32-seed">BIP32 Seed</Label>
              <Textarea
                id="bip32-seed"
                readOnly
                rows={3}
                value={masterNode?.seed}
                className="sm:col-span-1 md:col-span-2"
              />
            </div>
            <div className="grid gap-1 sm:grid-cols-1 md:grid-cols-2">
              <Label htmlFor="bip32-root-key">BIP32 Root Key</Label>
              <Textarea
                id="bip32-root-key"
                readOnly
                rows={3}
                value={masterNode?.xprv}
                className="sm:col-span-1 md:col-span-2"
              />
            </div>
            <div className="grid gap-1 sm:grid-cols-1 md:grid-cols-2">
              <Label htmlFor="bip32-public-key">BIP32 Public Key</Label>
              <Textarea
                id="bip32-public-key"
                readOnly
                rows={3}
                value={masterNode?.xpub}
                className="sm:col-span-1 md:col-span-2"
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
