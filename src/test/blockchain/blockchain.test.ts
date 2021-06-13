import Block from "../../main/block/block.class";
import Blockchain from "../../main/blockchain/blockchain.class";

describe("Blockchain", () => {
  let blockchain: any;
  let newChain: any;
  let originalChain: Block[];

  beforeEach(() => {
    blockchain = new Blockchain();
    newChain = new Blockchain();

    originalChain = blockchain.chain;
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
          blockchain.chain[2].data = "some-bad-data";
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

  /** test to replace the chain with the current longest chain */
  describe("replaceChain()", () => {
    describe("when the incoming chain is not longer", () => {
      it("does not replace the chain", () => {
        newChain.chain[0] = { new: "chain" };
        blockchain.replaceChain(newChain.chain);

        expect(blockchain.chain).toEqual(originalChain);
      });
    });

    describe("when the incoming chain is longer ", () => {
      beforeEach(() => {
        newChain.addBlock("Bears");
        newChain.addBlock("Deers");
        newChain.addBlock("Tigers");
      });

      // TODO: whether the incoming chain is invalid
      describe("and the incoming chain is invalid", () => {

        it("does not replace the chain", () => {
          newChain.chain[2] = "some-fake-hash";

          blockchain.replaceChain(newChain.chain) // should not replace the blockchain
          expect(blockchain.chain).toEqual(originalChain);
        });
      });

      // TODO: whether the incoming chain is valid
      describe("and the incoming chain is valid", () => {
        it("does replace the chain", () => {
          blockchain.replaceChain(newChain.chain); // should the replace the blockchain
          expect(blockchain.chain).toEqual(newChain.chain);
        });
      });
    });
  });
});
