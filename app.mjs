//Rewrite loc instead of tidying-up
import dotenv from './configs/environment.mjs';
import * as dbs from './configs/dbs.mjs';
import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastifyRawBody from 'fastify-raw-body';
import { checkFront, routes } from './routes/routes.mjs';
import fs from 'fs';
import * as fsextra from 'fs-extra';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import pino from 'pino';

dotenv.config();
const __db = dbs;
let app;
const __dirname = dirname(fileURLToPath(import.meta.url));
const __publicPrefix = "public";
const __loggerPrefix = process.env.PINO_LOGDIR;
if (fs.existsSync(__dirname + `/${__publicPrefix}`)) {
    console.log(`The directory /${__publicPrefix} exists`);
} else {
    console.log(`The directory /${__publicPrefix} does NOT exist`);
}

if (fs.existsSync(__dirname + `/${__loggerPrefix}`)) {
    console.log(`The directory /${__loggerPrefix} exists`);
} else {
    console.log(`The directory /${__loggerPrefix} does NOT exist`);
    fs.mkdirSync(__dirname + `/${__loggerPrefix}`,{recursive: true});
}

try {
    app = fastify({
        logger: true,
        bodyLimit: 40 * 1024 * 1024,
        // status: { type: 'object', additionalProperties: true },
    });
    __db.dbpool();

    /*
    app.register(fastifyRawBody,{
        field: "rawBody", // change the default request.rawBody property name
        global: true, // add the rawBody to every request. **Default true**
        encoding: "utf8", // set it to false to set rawBody as a Buffer **Default utf8**
        runFirst: true, // get the body before any preParsing hook change/uncompress it. **Default false**
        // routes: [], // array of routes, **`global`** will be ignored, wildcard routes not supported
    });
    */
   
    app.register(fastifyStatic,{
        root: path.join(__dirname, 'public'),
        prefix: `/${__publicPrefix}/`, // optional: default '/'
        index: false,
        list: false,
        constraints: { }, //{ host: 'example.com' } // optional: default {}
        handler: (request,reply) => {
            console.log(request);
            reply.status(403).send({message: "beep!"});
        }
    });

    console.log(checkFront(''));
    app.register(routes);

    await app.register(cors,{
        hook: 'preHandler',
        methods: 'CONNECT,GET,HEAD,OPTIONS,PATCH,POST,PUT',
        preflight : false,
    });

    app.listen({path: process.env.APP_HOST, port: process.env.APP_PORT}, function (err,address) {
        console.info(address);
        if(err) {
            throw err;
            process.exit(1);
        }
    });
}catch(err){
    console.log(err);
}
