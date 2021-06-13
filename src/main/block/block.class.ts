import CryptoHash from "../utils/crypto-hash.class";
import { GENESIS_DATA } from "./../config/genesis.config";

/**
 * Block Class
 */
export default class Block {
  timestamp: string;
  lastHash: string;
  hash: string;
  data: any;
    
  constructor(timestamp: string, lastHash: string, hash: string, data: any) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  static genesis(): Block {
    return new Block(
      GENESIS_DATA.timestamp,
      GENESIS_DATA.lastHash,
      GENESIS_DATA.hash,
      GENESIS_DATA.data
    );
  }

  static mineBlock(lastBlock: Block, data: any): Block {
    const timestamp = Date.now().toString();
    const lastHash = lastBlock.hash;
    const hash = CryptoHash.genHash([timestamp, lastHash, data])
    return new Block(
        timestamp,
        lastHash,
        hash,
        data,
    );
  }
}
