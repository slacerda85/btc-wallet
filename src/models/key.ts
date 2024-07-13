

export type ExtendedKeyInput = {
  prefix: string  
  depth: number
  parentFingerprint: number, 
  childNumber: number  
  chainCode: Buffer
  key: Buffer
}
