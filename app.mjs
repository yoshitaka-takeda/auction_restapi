//Rewrite loc instead of tidying-up
import dotenv from './configs/environment.mjs';
import * as dbs from './configs/dbs.mjs';
import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { checkFront, routes } from './routes/routes.mjs';
import fs from 'fs';
import * as fsextra from 'fs-extra';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import pino from 'pino';
import hvariables from "./globalservices/hvariables.mjs";

dotenv.config();
const __db = dbs;
let app;
const __dirname = dirname(fileURLToPath(import.meta.url));
const __publicPrefix = hvariables.publicDir;
const __loggerPrefix = process.env.PINO_LOGDIR;
if (fs.existsSync(__dirname + `/${__publicPrefix}`)) {
    console.log(`The directory /${__publicPrefix} exists`);
} else {
    console.log(`The directory /${__publicPrefix} does NOT exist`);
    fs.mkdirSync(__dirname + `/${__publicPrefix}`,{recursive: true});
}

if (fs.existsSync(__dirname + `/${__loggerPrefix}`)) {
    console.log(`The directory /${__loggerPrefix} exists`);
} else {
    console.log(`The directory /${__loggerPrefix} does NOT exist`);
    fs.mkdirSync(__dirname + `/${__loggerPrefix}`,{recursive: true});
}

const d = new Date();
try {
    app = fastify({
        logger: {
            level: 'info',
            file: `./${__loggerPrefix}/${d.getFullYear()}-${(d.getMonth()+1 < 10)? '0' + (d.getMonth()+1):(d.getMonth()+1)}-${(d.getDate() < 10?'0'+d.getDate():d.getDate())}${ process.env.PINO_LOGFILE }`
        },
        bodyLimit: 40 * 1024 * 1024,
        // status: { type: 'object', additionalProperties: true },
    });
    __db.dbpool();
   
    app.register(fastifyStatic,{
        root: path.join(__dirname, `${__publicPrefix}`),
        prefix: `/${__publicPrefix}/`, // optional: default '/'
        index: false,
        list: false,
        constraints: { }, //{ host: 'example.com' } // optional: default {}
        handler: (request,reply) => {
            console.log(request);
            reply.status(403).send({
                message: "beep!"
            });
        }
    });

    // console.log(checkFront(''));
    app.register(routes);

    await app.register(cors,{
        hook: 'preHandler',
        methods: 'CONNECT,GET,HEAD,OPTIONS,PATCH,POST,PUT',
        preflight : false,
    });

    app.listen({path: process.env.APP_HOST, port: process.env.APP_PORT}, function (err,address) {
        // console.info(address);
        app.log.info(`Running as ${process.env.APP_HOST} on port: ${process.env.APP_PORT}`);
        if(err) {
            throw err;
        }
    });
}catch(err){
    throw err;
}
