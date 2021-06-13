import Block from "../block/block.class";
import CryptoHash from "../utils/crypto-hash.class";

/**
 * Blockchain class
 */
export default class Blockchain {
  chain: Block[]; // stores the actual chain

  /**
   * initialize the first block of the chain as genesis block
   */
  constructor() {
    this.chain = [Block.genesis()];
  }

  /**
   * Adding Data to the block
   * and pushing the block into the chain
   * @param data the data to be added to the block
   */
  addBlock(data: any) {
    const newBlock = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(newBlock);
  }

  /**
   * Validate the entire chain by checking the following
   * 1. check if the first block is the genesis block.
   * 2. check if the lastHash property of the current block is equal to the hash of the previous block.
   * 3. check if the hash of the current block is correctly generated using the CryptoHash class.
   * @param blocks passing the entire chain for validation
   * @returns boolean value for each condition.
   */
  static isValidChain(blocks: Block[]): boolean {
    // we cannot directly compare objects so we need to compare the properties of those objects.
    if (JSON.stringify(blocks[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    // Looping through the entire chain and checking individual blocks
    for (let i: number = 1; i < blocks.length; i++) {
      let currentBlock: Block = blocks[i];
      let previousBlock: Block = blocks[i - 1];

      if (currentBlock.lastHash !== previousBlock.hash) {
        return false;
      }

      if (
        currentBlock.hash !==
        CryptoHash.genHash([
          currentBlock.timestamp,
          currentBlock.lastHash,
          currentBlock.data,
        ])
      ) {
        return false;
      }
    }
    return true;
  }

  /**
   * Replace chain function to replace the current chain with the current longest chain
   * Conditions given
   * 1. The incoming chain must be longer than the current chain
   * 2. The incoming chain must be valid.
   * @param chain incoming chain.
   * Replaces the current chain with the incoming chain
   */
  replaceChain(chain: Block[]) {
    // checking if the length of the incoming chain is less than the existing chain
    if(chain.length < this.chain.length) {
      console.error(`Incoming chain must be longer`);
      
      return;
    }
    // checking if the incoming chain is not valid
    if(!Blockchain.isValidChain(chain)) {
      console.error(`Incoming chain must be valid`);
      return;
    }

    console.log(`Replacing chain with incoming chain: ${JSON.stringify(chain)}`);
    
    this.chain = chain;
  }
}
