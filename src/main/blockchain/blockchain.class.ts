import Block from "../block/block.class";
import CryptoHash from "../crypto-hash/crypto-hash.class";

export default class Blockchain {
  chain: Block[];
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data: any) {
    const newBlock = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(newBlock);
  }

  static isValidChain(blocks: Block[]): boolean {
    if (JSON.stringify(blocks[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    
    for(let i:number=1; i<blocks.length; i++) {
        let currentBlock: Block = blocks[i];
        let previousBlock: Block = blocks[i-1];

        if(currentBlock.lastHash !== previousBlock.hash) {
            return false;
        }

        if(currentBlock.hash !== CryptoHash.genHash([currentBlock.timestamp, currentBlock.lastHash, currentBlock.data])) {
            return false;
        }
    }
    return true;
  }
}
