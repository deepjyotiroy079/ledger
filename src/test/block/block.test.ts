import { GENESIS_DATA } from './../../main/config/genesis.config';
import Block from '../../main/block/block.class';
import CryptoHash from '../../main/utils/crypto-hash.class';

describe('Block', () => {
    const timestamp = "10/10/2021";
    const lastHash = "lastHash";
    const hash = "hash";
    const data = "data";

    const block = new Block(timestamp, lastHash, hash, data);
    it('is block has timestamp, lasthash, hash and data', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    })

    describe('Genesis Block', () => {
        let genesisBlock = Block.genesis();

        console.log(`Genesis Block : ${JSON.stringify(genesisBlock)}`);
        
        it('returns block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        })

        it('returns Genesis Data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        })
    })

    describe('Mine Block', () => {
        let lastBlock = Block.genesis();
        let data = 'mine block';

        let minedBlock = Block.mineBlock(lastBlock, data);

        it('returns a block instance', () => {
            expect(minedBlock instanceof Block).toBe(true);
        });

        it('set the `lastHash` to be the `hash` of the lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        })

        it('sets the `data`', () => {
            expect(minedBlock.data).toEqual(data);
        })

        it('sets the `timestamp`', () => {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        })

        it('creates SHA256 `hash` based on proper inputs', () => {
            expect(minedBlock.hash).toEqual(CryptoHash.genHash([minedBlock.timestamp, lastBlock.hash, data]))
        })
    })
    
    
})
