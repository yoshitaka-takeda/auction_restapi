import fastify from "fastify";
import fastifyRawBody from "fastify-raw-body";
import dotenv from "../configs/environment.mjs";

dotenv.config();
let f = fastify();
let router;
const frontUrl = process.env.PROXY_HOST;
const options = {

};

export async function routes(fastify=f, options=null) {

    fastify.get("/",options, async (request,reply) => {
        console.log(request);
        // console.log(reply);
        
        try {
            reply.status(200).send({
                message: { 
                    path: `${ request.method } '/'`,
                    method: `'GET','POST','PUT','PATCH','CONNECT','HEAD','OPTIONS'`,
                    routes: [
                        `(GET|OPTIONS) '/'`,
                        `(GET|POST) '/login'`,
                        `(GET|POST) '/logout'`,
                        `(GET|POST|PUT) '/register'`,
                        `(POST) '/listUser'`,
                        `(GET|POST) '/getUser'`,
                        `(GET|PATCH) '/updateUser'`,
                        `(POST|OPTIONS) '/listAuction'`,
                        `(PUT) '/createAuction'`,
                        `(GET|PATCH) '/editAuction'`,
                        `(GET|PATCH) '/bidAuction'`
                    ]
                }
            });
        }catch(err){
            reply.status(400).send({
                message: `${err}`
            })
        }
    });

    fastify.options("/", options, async (request, reply, next) => {
        try {
            console.log(request);
            console.info(request.body);
            console.info(request.query);
            const response = request.body;
            reply.status(200).send(
                response
            );
        }catch(err){
            reply.status(400).send({
                message: `${err}`
            })
        }
    });

    fastify.get("/login",options, async (request,reply) => {
        try {
            reply.status(200).send({
                message: {
                    METHOD: 'POST',
                    REQUIRED: 'Key-Header, rawBody',
                    rawBody: {
                        username: '',
                        mailaddr: '',
                        password: '',
                    }
                }
            });
        }catch(err){
            reply.status(400).send({
                message: `${err}`
            })
        }
    });

    fastify.post("/login",options, async (request,reply) => {
        try {
            reply.status(200).send({
                
            });
        }catch(err){
            reply.statusCode(400).send({
                message: `${err}`
            })
        }
    });

    fastify.get("/logout",options, async (request,reply) => {
        try {
            reply.status(200).send({
                
            });
        }catch(err){
            reply.statusCode(400).send({
                message: `${err}`
            })
        }
    });
    fastify.post("/logout",options, async (request,reply) => {
        try {
            reply.status(200).send({
                
            });
        }catch(err){
            reply.statusCode(400).send({
                message: `${err}`
            })
        }
    });

    fastify.get("/register",options, async (request,reply) => {
        try {
            reply.status(200).send({
                message: {
                    METHOD: 'POST',
                    REQUIRED: 'Key-Header, rawBody',
                    rawBody: {
                        username: '',
                        mailaddr: '',
                        password: '',
                    }
                }
            });
        }catch(err){
            reply.statusCode(400).send({
                message: `${err}`
            })
        }
    });

    fastify.post("/register",options, async (request,reply) => {
        try {
            reply.status(200).send({
                
            });
        }catch(err){
            reply.statusCode(400).send({
                message: `${err}`
            })
        }
    });

    fastify.put("/register",options, async (request,reply) => {
        try {
            reply.status(200).send({
                
            });
        }catch(err){
            reply.statusCode(400).send({
                message: `${err}`
            })
        }
    });

    fastify.post("/listUser",options, async (request,reply) => {
        try {
            reply.status(200).send({
                message: '',
            });
        }catch(err){
            reply.statusCode(400).send({
                message: `${err}`
            })
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
            console.info(response);
            return response;
        }).catch((response) => {
            console.error(response);
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