import CryptoHash from '../../main/utils/crypto-hash.class';

describe("cryptoHash function", () => {
  //   fe14010b4fe83303852f0467c919ef9a7ca089b91e96e3aad7d426dd87079297;

  it("generates SHA-256 hashed output", () => {
    expect(CryptoHash.genHash("foo")).toEqual(
      "b2213295d564916f89a6a42455567c87c3f480fcd7a1c15e220f17d7169a790b"
    );
  });

    // it("produces the same hash with the same input in any order", () => {
    //   expect(CryptoHash.genHash(["one", "two", "three"])).toEqual(
    //     CryptoHash.genHash(["three", "one", "two"])
    //   );
    // });
});
