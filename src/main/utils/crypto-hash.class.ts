import * as crypto from 'crypto-js';

export default class CryptoHash {
    static genHash(data: any): string {
        return crypto.SHA256(JSON.stringify(data)).toString();
    }
}