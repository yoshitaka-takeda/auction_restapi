import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import dotenv from "../configs/environment.mjs";

let f = fastify();
let router;
const frontUrl = '';
const options = {

};

export async function routes(fastify=f, options=null) {
    fastify.get("/",options, async (request,reply) => {
        console.log(request);
        console.log(reply);
        try {
            reply.status(200).send({
                message: { 
                    path: `${ request.method } "/"`,
                    method: `${ request.method }`,
                    routes: [
                        '/login', '/register'
                    ]
                }
            });
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
                    REQUIRED: 'Key-Header, rawBody'
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
}

async function checkFront(url=frontUrl) {
    let frontStatus;

    const resolver = await url();

    return frontStatus;
}

export default router = {
    frontUrl,
    checkFront
}