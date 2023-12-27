//Rewrite loc instead of tidying-up
import dotenv from './configs/environment.mjs';
import * as dbs from './configs/dbs.mjs';
import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { routes } from './routes/routes.mjs';
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
if (fs.existsSync(__dirname + `/${__publicPrefix}`)) {
    console.log('The directory exists');
} else {
    console.log('The directory does NOT exist');
}

try {
    app = fastify({logger: true});
    // console.log(app);
    __db.dbpool();
    
    // console.log(fs);
    // console.log(fsextra);
    // console.log(cors);
    app.register(fastifyStatic,{
        root: path.join(__dirname, 'public'),
        prefix: `/${__publicPrefix}/`, // optional: default '/'
        index: false,
        list: false,
        constraints: { }, //{ host: 'example.com' } // optional: default {}
        handler: (request,reply) => {
            console.log(request);
            reply.status(403).send({message: "beep"});
        }
    });
    await app.register(cors,{
        hook: "preHandler",
        
    });
    app.register(routes);

    app.listen({port: process.env.APP_PORT}, function (err,address) {
        if(err) {
            throw err;
            process.exit(1);
        }
    });
}catch(err){
    console.log(err);
}
