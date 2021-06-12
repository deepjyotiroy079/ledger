import Block from "../../main/block/block.class";
import Blockchain from "../../main/blockchain/blockchain.class";

describe("Blockchain", () => {
  let blockchain: any;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it("contains a `chain` array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it("starts with the genesis block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it("can add a new block to the chain", () => {
    const newData = {
      data: "new data",
    };
    blockchain.addBlock(newData);

    // get the last block
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });

  describe("isValidChain", () => {
    // TODO: when chain doesnot start with genesis
    describe("when chain doesnot start with genesis block", () => {
      it("returns false", () => {
        blockchain.chain[0] = new Block(
          "01/02/2021",
          "last-hash",
          "hash",
          "fake-genesis"
        );
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });
    // when chain does start with genesis
    describe("when chain does start with genesis block and has multiple blocks", () => {
      beforeEach(() => {
        blockchain.addBlock("Bears");
        blockchain.addBlock("Deers");
        blockchain.addBlock("Tigers");
      });
      // TODO: check if lastHash is being changed
      describe("and the lastHash is being changed", () => {
        it("returns false", () => {
          blockchain.chain[2].lastHash = "broken-hash";
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });

      // TODO: check if block contains any invalid fields
      describe("and the block contains invalid fields", () => {
        it("returns false", () => {
          blockchain.chain[2].data = 'some-bad-data';
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      
      // TODO: check if the chain contains invalid blocks
      describe("and the chain does not contains invalid blocks", () => {
        it("returns true", () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });
});
