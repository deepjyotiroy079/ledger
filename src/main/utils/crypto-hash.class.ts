import * as crypto from 'crypto-js';

export default class CryptoHash {
    static genHash(data: any): string {
        const hash = crypto.SHA256(JSON.stringify(data)).toString();
        return hash;
    }
}