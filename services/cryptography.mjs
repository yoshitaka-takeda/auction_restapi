import hvariables from "../globalservices/hvariables.mjs"

const hv = hvariables;

class cryptography {
    variables = hv;

    encryption(string){
        return string
    }

    decryption(string){
        return "0";
    }
}

export default new cryptography();