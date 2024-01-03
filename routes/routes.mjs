import fastify from "fastify";
import dotenv from "../configs/environment.mjs";
import users from "../models/users.mjs";
import internalservices from "../globalservices/internalservices.mjs";
import cryptography from "../services/cryptography.mjs";

dotenv.config();
let f = fastify();
let router;
const frontUrl = process.env.PROXY_HOST;
const options = {

};

export async function routes(fastify=f, options=null) {
    fastify.get("/",options, async (request,reply) => {
        try {
            reply.status(200).send({
                message: { 
                    path: `${ request.method } '/'`,
                    methods: `'GET','POST','PUT','PATCH','CONNECT','HEAD','OPTIONS'`,
                    routes: [
                        `(GET|OPTIONS) '/'`,
                        `(GET|POST) '/login'`,
                        `(GET|POST) '/logout'`,
                        `(GET|POST|PUT) '/register'`,
                        `(GET|POST) '/listUser'`,
                        `(GET|POST) '/getUser'`,
                        `(GET|PATCH) '/updateUser'`,
                        `(GET|POST|OPTIONS) '/listAuction'`,
                        `(GET|PUT) '/createAuction'`,
                        `(GET|PATCH) '/editAuction'`,
                        `(GET|PUT|PATCH) '/bidAuction'`
                    ]
                }
            });
        }catch(err){
            throw err;
        }
    });

    fastify.options("/", options, async (request, reply, next) => {
        try {
            const response = request.body;
            if(request.headers.hasOwnProperty('keypair')){
                if(process.env.KEYWORD === internalservices.decode(request.headers.keypair)){
                    reply.status(200).send(
                        response
                    );
                }else{
                    reply.status(202).send({
                        message: "are you SYSUSER?"
                    });
                }
            }else{
                reply.status(400).send({
                    message: "Request rejected"
                });
            }
        }catch(err){
            throw err;
        }
    });

    fastify.get("/login",options, async (request,reply) => {
        try {
            reply.status(200).send({
                message: {
                    METHOD: 'POST',
                    REQUIRE: 'KeyPair-Header, Body',
                    rawBody: {
                        username: '',
                        password: '',
                    }
                }
            });
        }catch(err){
            throw err;
        }
    });

    fastify.post("/login",options, async (request,reply) => {
        try {
            reply.status(200).send({
                data: {

                }
            });
        }catch(err){
            throw err;
        }
    });

    fastify.get("/logout",options, async (request,reply) => {
        try {
            reply.status(200).send({
                message: {
                    METHOD: 'POST',
                    REQUIRE: 'KeyPair-Header, Body',
                    Body: {
                        username: '',
                        mailaddr: '',
                        password: '',
                    }
                }
            });
        }catch(err){
            throw err;
        }
    });
    fastify.post("/logout",options, async (request,reply) => {
        try {
            reply.status(200).send({
                data: {

                }
            });
        }catch(err){
            throw err;
        }
    });

    fastify.get("/register",options, async (request,reply) => {
        try {
            reply.status(200).send({
                message: {
                    METHOD: 'POST|PUT',
                    REQUIRED: 'KeyPair-Header, rawBody',
                    Body: {
                        username: '',
                        mailaddr: '',
                        password: '',
                    }
                }
            });
        }catch(err){
            throw err;
        }
    });

    fastify.post("/register",options, async (request,reply) => {
        try {
            if(request.headers.hasOwnProperty('keypair')){
                if(process.env.KEYWORD === internalservices.decode(request.headers.keypair)){
                    if(request.headers.hasOwnProperty('current-date')){
                        
                        console.log(request.body);
                        
                        if(fetchdata.length > 0 ){
                            reply.status(200).send({
                                data: fetchdata
                            });
                        }else{
                            reply.status(200).send({
                                message: `${await users.getTableName()} currently have no data`
                            });
                        }
                    }else{
                        reply.status(202).send({
                            message: "current-date header is needed"
                        });
                    }
                }else {
                    reply.status(202).send({
                        message: "are you SYSUSER?"
                    });
                }
            }else{
                reply.status(202).send({
                    message: "keypair header is missing"
                })
            }
        }catch(err){
            throw err;
        }
    });

    fastify.put("/register",options, async (request,reply) => {
        try {
            if(request.headers.hasOwnProperty('keypair')){
                if(process.env.KEYWORD === internalservices.decode(request.headers.keypair)){
                    if(request.headers.hasOwnProperty('current-date')){
                        
                        console.log(request.body);
                        let fetchdata = await users.create(request.body);
                        if(fetchdata.length > 0 ){
                            reply.status(200).send({
                                data: fetchdata
                            });
                        }else{
                            reply.status(200).send({
                                message: `${await users.getTableName()} currently have no data`
                            });
                        }
                    }else{
                        reply.status(202).send({
                            message: "current-date header is needed"
                        });
                    }
                }else {
                    reply.status(202).send({
                        message: "are you SYSUSER?"
                    });
                }
            }else{
                reply.status(202).send({
                    message: "keypair header is missing"
                })
            }
        }catch(err){
            throw err;
        }
    });

    fastify.get("/listUser",options, async (request,reply) => {
        try {
            reply.status(200).send({
                message: {
                    METHOD: 'POST',
                    REQUIRED: 'KeyPair-Header, Current-Date-Header (Format: YYYYmmdd)',
                }
            });
        }catch(err){
            throw err;
        }
    });

    fastify.post("/listUser",options, async (request,reply) => {
        try {
            // console.log(request.headers);
            // console.log(request.body);
            if(request.headers.hasOwnProperty('keypair')){
                if(process.env.KEYWORD === internalservices.decode(request.headers.keypair)){
                    if(request.headers.hasOwnProperty('current-date')){
                        const fetchdata = await users.findAll();
                        if(fetchdata.length > 0 ){
                            reply.status(200).send({
                                data: fetchdata
                            });
                        }else{
                            reply.status(200).send({
                                message: `${await users.getTableName()} currently have no data`
                            });
                        }
                    }else{
                        reply.status(202).send({
                            message: "current-date header is needed"
                        });
                    }
                }else {
                    reply.status(202).send({
                        message: "are you SYSUSER?"
                    });
                }
            }else{
                reply.status(202).send({
                    message: "keypair header is missing"
                })
            }
        }catch(err){
            throw err;
        }
    });

    fastify.get("/getUser",options, async (request,reply) => {
        try {
            reply.status(200).send({
                message: {
                    METHOD: 'POST',
                    REQUIRED: 'Key-Header, Body (JSON)',
                    Body: {
                        username: '',
                        session_id: ''
                    }
                }
            });
        }catch(err){
            throw err;
        }
    });

    fastify.post("/getUser",options, async (request,reply) => {
        try {

            // console.log(request.body);
            if(request.headers.hasOwnProperty('keypair')){
                if(process.env.KEYWORD === internalservices.decode(request.headers.keypair)){
                    if(request.headers.hasOwnProperty('current-date')){
                        const fetchdata = await users.find(request.body);
                        if(fetchdata.length > 0 ){
                            reply.status(200).send({
                                data: fetchdata
                            });
                        }else{
                            reply.status(200).send({
                                message: `${await users.getTableName()} currently have no data`
                            });
                        }
                    }else{
                        reply.status(202).send({
                            message: "current-date header is needed"
                        });
                    }
                }else {
                    reply.status(202).send({
                        message: "are you SYSUSER?"
                    });
                }
            }else{
                reply.status(202).send({
                    message: "keypair header is missing"
                })
            }
        }catch(err){
            throw err;
        }
    });

    fastify.get("/test",options, async (request,reply) => {
        try {
            if(request.headers.hasOwnProperty('keypair')){
                if(process.env.KEYWORD === internalservices.decode(request.headers.keypair)){
                    const __cryptography = cryptography;
                    try{
                        console.log(__cryptography);
                        let x = __cryptography;
                        reply.status(200).send({
                            data: {}
                        });
                    }catch(err){
                        throw err;
                    }
                }else {
                    reply.status(202).send({
                        message: "are you SYSUSER?"
                    });
                }
            }else{
                reply.status(202).send({
                    message: "keypair header is missing"
                })
            }
        }catch(err){
            throw err;
        }
    });
}

export async function checkFront(url=frontUrl) {
    let frontStatus;
    let resolver;

    const PROXY=
			(process.env.PROXY_PORT!==undefined||process.env.PROXY_PORT!==null)?
				":"+process.env.PROXY_PORT:'';
		console.log(process.env.APP_HOST+PROXY);
	const __url="http://"+process.env.APP_HOST+PROXY;

    try{
        resolver = await fetch(((url.length===0)?__url:url)+"?op=ui-running&sender=api",{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            return response;
        }).catch((response) => {
            return response;
        });
    }catch(err){
        throw err;
    }

    console.error(resolver);
    // frontStatus = resolver.then((response) => {
    //     console.log(response);
    //     return response;
    // });
    return frontStatus;
}

export default router = {
    frontUrl,
    checkFront
}