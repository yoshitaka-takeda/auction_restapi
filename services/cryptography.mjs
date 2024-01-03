'use strict';
import hvariables from "../globalservices/hvariables.mjs"
import internalservices from "../globalservices/internalservices.mjs";
import dotenv from "../configs/environment.mjs";
import crypto from "node:crypto";

dotenv.config();
const hv = hvariables;

class cryptography {
    password = (Buffer.from(process.env.KEYWORD + hv.pairKey).toString(internalservices.stringEncode)).substring(0,32);
    AES_METHOD = 'aes-256-cbc';
    IV_LENGTH = 16;

    encryption(string){
        if (process.versions.openssl <= '1.0.1f') {
            throw new Error('OpenSSL Version too old, vulnerability to Heartbleed')
        }

        let iv = crypto.randomBytes(this.IV_LENGTH);
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.password), iv);
        let encrypted = cipher.update(string);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return iv.toString('hex') + ":" + encrypted.toString('hex');        
    }

    decryption(string){
        if (process.versions.openssl <= '1.0.1f') {
            throw new Error('OpenSSL Version too old, vulnerability to Heartbleed')
        }

        let textParts = string.split(':');
        let iv = Buffer.from(textParts[0], 'hex');
        let encryptedText = Buffer.from(textParts[1], 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.password), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
}

export default new cryptography();