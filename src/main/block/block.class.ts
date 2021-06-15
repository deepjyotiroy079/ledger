import CryptoHash from "../utils/crypto-hash.class";
import { GENESIS_DATA } from "./../config/genesis.config";

/**
 * Block Class
 */
export default class Block {
  timestamp: number;
  lastHash: string;
  hash: string;
  data: any;

  // implementing proof of work
  nonce: number;
  difficulty: number;
    
  constructor(timestamp: number, lastHash: string, hash: string, data: any, nonce: number, difficulty: number) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis(): Block {
    return new Block(
      GENESIS_DATA.timestamp,
      GENESIS_DATA.lastHash,
      GENESIS_DATA.hash,
      GENESIS_DATA.data,
      GENESIS_DATA.nonce,
      GENESIS_DATA.difficulty,
    );
  }
  /**
   * function for mining the blocks
   * @param lastBlock the previous Block
   * @param data the data that you want to store in the new block
   * @returns newly mined Block
   */
  static mineBlock(lastBlock: Block, data: any): Block {
    let timestamp: number;
    let hash: string;
    // const timestamp = Date.now().toString();
    const lastHash: string = lastBlock.hash;
    let { difficulty } = lastBlock;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      hash = Block.generateHash(timestamp, lastHash, data, nonce, difficulty);

    } while(hash.substr(0, difficulty) !== '0'.repeat(difficulty));

    return new Block(
        timestamp,
        lastHash,
        hash,
        data,
        nonce,
        difficulty
    );
  }

  /**
   * Static function that uses utility class to generate hash.
   * @param timestamp the time stamp of the block
   * @param lastHash the hash of the previous block
   * @param data the data that you want to store in the block
   * @param nonce the nonce
   * @param difficulty the difficulty of the block
   * @returns SHA256 hash
   */
  static generateHash(timestamp: number, lastHash: string, data: any, nonce: number, difficulty: number): string {
    return CryptoHash.genHash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`);
  }
}
