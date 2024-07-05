interface HumanReadableInput {
  previousOutputTxHash: string;
  previousOutputTxIndex: number;
  utxoScriptLength: number;
  utxoScript: string;
  sequence: number;
  // privateKey: string;
  // publicKey: string;
}

export interface Input {
  /* UTXO txid (hash256, little-endian) */
  txid: string;
  /* UTXO index (32bit) */
  index: number;
  /* script length (varint) */
  scriptLength: number;
  /* script (data) */
  script: string;
  /* sequence (32bit) */
  sequence: number;
}

export interface Output {
  /* output value (64bit) */
  value: number;
  /* script length (varint) */
  scriptLength: number;
  /* script (data) */
  script: string;
}

export interface Transaction {
  /* version (32bit) */
  version: number;
  /* input count (varint) */
  inputs: Input[];
  /* output count (varint) */
  outputs: Output[];
  locktime: number;
}
