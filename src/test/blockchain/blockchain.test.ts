import Block from '../../main/block/block.class';
import Blockchain from '../../main/blockchain/blockchain.class';

describe('Blockchain', () => {
    const blockchain = new Blockchain();

    it('contains a `chain` array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    })

    it('can add a new block to the chain', () => {
        const newData = {
            data: "new data"
        }
        blockchain.addBlock(newData);

        // get the last block
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
    })
})
