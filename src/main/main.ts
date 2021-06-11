import Block from "./block/block.class";

class Main {
    static main(): void {
        const block = new Block("01/01/2021", "lasthash", "hash", { data: "message" });
        console.log(`Block timestamp : ${block.timestamp}`);
        console.log(`Block Last Hash : ${block.lastHash}`);
        console.log(`Block Hash : ${block.hash}`);
        console.log(`Data : ${block.data.data}`);
    }
}

Main.main();