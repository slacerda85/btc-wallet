import { Input, Output, Transaction } from '@/models/transaction';
import reverseBuffer from '@/utils/reverseBuffer';
import { Uint64LE } from 'int64-buffer';

export default class TransactionService {
  
  createUnsignedTransaction(transaction: Transaction): string {

    const transactionArray = []

    // version
    const version = Buffer.allocUnsafe(4)
    version.writeUInt32LE(transaction.version)
    transactionArray.push(version)

    // input count
    const inputCount = Buffer.allocUnsafe(1)
    inputCount.writeInt8(transaction.inputs.length)
    transactionArray.push(inputCount)

    // inputs
    transaction.inputs.forEach(input => {
      const txid = Buffer.from(input.txid, 'hex').reverse()
      const index = Buffer.allocUnsafe(4)
      index.writeUInt32LE(input.index)
      const scriptLength = Buffer.allocUnsafe(1)
      scriptLength.writeUInt8(input.scriptLength)
      const script = Buffer.from(input.script, 'hex')
      const sequence = Buffer.allocUnsafe(4)
      sequence.writeUInt32LE(input.sequence)

      // push to transactionArray
      transactionArray.push(reverseBuffer(txid))
      transactionArray.push(index)
      transactionArray.push(scriptLength)
      transactionArray.push(script)
      transactionArray.push(sequence)
    })

    // output count
    const outputCount = Buffer.allocUnsafe(1)
    outputCount.writeInt8(transaction.outputs.length)

    transactionArray.push(outputCount)

    // outputs
    transaction.outputs.forEach(output => {

      const scriptLength = Buffer.allocUnsafe(1)
      const script = Buffer.from(output.script, 'hex')
      scriptLength.writeUInt8(output.scriptLength)

      const value = new Uint64LE(output.value)
      
      transactionArray.push(value.toBuffer())
      transactionArray.push(scriptLength)
      transactionArray.push(script)
       
    })

    const locktime = Buffer.allocUnsafe(4)
    locktime.writeUInt32LE(transaction.locktime)
    transactionArray.push(locktime)

    const serialized = this.serializeBuffer(transactionArray)

    return serialized
  }

  serializeBuffer(transactionArray: Buffer[]) {
    let transactionHex = ''

    transactionArray.forEach(buffer => {
      transactionHex += buffer.toString('hex')
    })

    return transactionHex
  }

  createSignedTransaction(transaction: Transaction): string {
    return ''
  }

  signTransaction(transaction: Transaction): string {
    return ''
  }


}