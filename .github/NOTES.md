# Blockchain

A blockchain is a public and immutable shared ledger that stores all transactions for an application, such as a cryptocurrency like Bitcoin and Ethereum. For a cryptocurrency application, the ledger stores all transactions such as who transferred funds to who, similar to a bank ledger. Each set of transactions is represented as a block on the blockchain. A block can store multiple transactions.

Once a transaction has been committed (mined) to the blockchain (ledger), it can’t be edited or removed. Also, all nodes on the blockchain network keep a replicated copy of the blockchain so there is no central place where the block chain is stored. When a new block is added to the blockchain, all nodes in the blockchain network are updated to have the newest version of the blockchain.

Every block in the chain is linked to the previous block by storing the hash value of the previous block, which creates a chain of blocks.

Instead of a central trusted authority like a bank, the blockchain network itself acts as the trusted authority because of its built in trust and security features. This eliminates the need for middle men such as banks and doesn’t have a single point of failure. An attacker would have to take over a large segment of a blockchain network in order to compromise.


## The Block

The fundamental object of the block chain is the block, which represents an individual link in the blockchain. The blockchain stores the following properties:

 - ```current hash``` - (based on the timestamp, hash of previous block and transactions)
 - ```hash``` - of the previous block
 - ```timestamp``` - of the the block on which it was mined.
 - ```data``` - to store (cryptocurrency transactions but can store generic data, as well)
 - ```nonce``` - value (for mining new blocks)
 - ```difficulty``` - value (for mining new blocks)

## The Genesis Block

The Genesis Block is the very first block in a blockchain – a way to start a blockchain. Since there’s no preceding block, the genesis block uses hard coded dummy values for its previous hash value. This way, when the second block gets added to the blockchain, it will set the value of its previous hash to the hash of the genesis block. Since the genesis block is hard coded, we make it a static method of the Block class, so it’s accessible without instantiating a Block object.

## Responsibility of a blockchain

* Storing list of blocks.
* Adding new blocks to the chain.
* Validating the newly created blockchain.
* Replacing current blockchain with the new one (the current chain is replaced with the longest valid chain or in easy terms sync the blockchain at all nodes).

## Replication

Every node on the network needs to have the same copy of the blockchain. So what happens when a new block gets mined on one node? Now the system has to replicate the new block to all the other nodes on the network so every node is in sync and has the same copy of the blockchain.

## Fork

Since the blockchain needs to be replicated among all nodes in the network, the question arises – what happens if two nodes mine a block at the same time? This is when there’s a fork in the blockchain and the system needs to reconcile the fork and merge all the new blocks.

* When a fork occurs, some nodes will get replicated from node A and some will get replicated from node B

We will use the rule that the longest chain will be accepted as the main chain. If there is a conflict between multiple nodes mining blocks at the same time, eventually, one chain will be longer and that will be accepted as the master blockchain. The other blocks that were mined on the shorter chain will be incorporated into the main blockchain.

## The proof of work concept

* A system where information can be `costly` to produce but easy to `verify`

* Work is done while generating block's hash value and it is easily verified by the rest of the network to check if it is correctly done.

* Each node solves a problem to prove that they have done some work.


* Nodes compete with each other to solve the problem and add the block to the blockchain. In return of the miner's time and resources (computation and electricity) they are paid ```transaction fees``` that directly comes from the users.

* In case of bitcoin network, the miners are awarded `bitcoins` as reward for mining new block.

* Miners are trying to find nonce for every new block.

## Miners

Nodes that attempt to solve the problem are known as `miners`.

## Nonce

For creating hash for the block the system requests for a very specific hash value that starts with a `certain number of ZEROS`. Computers guess the `nonce` over and over until they come up with a value that gives the correct hash.

The nonce value is iterated by one on every hash generation attempt. If the hash value satisfies the difficulty level, we save the nonce value in the block so other nodes can quickly validate the hash.
```
    BLOCK DATA + NONCE = HASH VALUE
```

## Difficulty

There are different proof-of-work systems, but this blockchain uses a similar proof-of-work system that Bitcoin uses, ```Hashcash```. 

The goal is to generate a hash with a certain number of leading zeros, which is the difficulty level.

## Mining Rate and Dynamic Difficulty

The blockchain must add a block to its chain at a given rate. For example in case of Bitcoin it's 10 mins. If blocks are added to the chain too frequently that means that difficulty is low and similarly if the blocks are added to chain too slowly that means the difficulty is high.

```
    The Adding of blocks to the chain is know as Mining
```

To maintain an average mining rate we must adjust the difficulty for every block so as to add blocks at a reasonable rate. In this blockchain we are comparing the timestamp of the current block and the previous block. 

* If the difference in timestamp is `less than` the `mining rate`, it means blocks are taking less time to be mined and added to the chain. Therefore, `we must increase the difficulty for the next block`.

* Similarly if the difference in timestamp is `more than` the `mining rate`, it means blocks are taking longer to be mined and added to the chain. Therefore, `we must decrease the difficulty for the next block`.