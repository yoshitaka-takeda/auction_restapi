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
    STRPARSE_METHOD = 'hex';

    encryption(string){
        if (process.versions.openssl <= '1.0.1f') {
            throw new Error('OpenSSL Version too old, vulnerability to Heartbleed')
        }

        let iv = crypto.randomBytes(this.IV_LENGTH);
        let cipher = crypto.createCipheriv(this.AES_METHOD, Buffer.from(this.password), iv);
        let encrypted = cipher.update(string);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return iv.toString(this.STRPARSE_METHOD) + ":" + encrypted.toString(this.STRPARSE_METHOD);        
    }

    decryption(string){
        if (process.versions.openssl <= '1.0.1f') {
            throw new Error('OpenSSL Version too old, vulnerability to Heartbleed')
        }

        let textParts = string.split(':');
        let iv = Buffer.from(textParts[0], this.STRPARSE_METHOD);
        let encryptedText = Buffer.from(textParts[1], this.STRPARSE_METHOD);
        let decipher = crypto.createDecipheriv(this.AES_METHOD, Buffer.from(this.password), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
}

export default new cryptography();