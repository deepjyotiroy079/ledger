const crypto = require('crypto-js');

console.log(crypto.SHA256(JSON.stringify("foo")).toString());