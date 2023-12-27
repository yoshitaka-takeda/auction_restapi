import * as dotenv from 'dotenv';
import mariadb from 'mariadb';
import pkg from 'pg';
const {Client} = pkg;

dotenv.config();
let client;
let pool;

export let defaultdb = process.env.MDB_pool;
export async function dbpool(dbconnection=defaultdb)
{
    let configuration;
    try{
        switch(dbconnection) {
            case process.env.MDB_pool:
                try{
                    pool = mariadb.createPool({
                        host: process.env.DB_SERVER,
                        user: process.env.DB_USERNAME,
                        password: process.env.DB_PASSWORD,
                        connectionLimit: 20,
                        timeout: 30000,
                        timezone: '+07:00',
                        connectTimeout: 7000,
                    });
                    client = await pool.getConnection();
                    const output = client.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`).then((res) =>console.log(res));
                    let xoutput = client.query(`SELECT * FROM information_schema.SCHEMATA WHERE SCHEMA_NAME=\'${process.env.DB_NAME}\'`).then((rows) => console.log(rows));
                    console.log(xoutput);
                    configuration = xoutput;
                    console.log(`using ${dbconnection} pool`);
                }catch(swerr){
                    throw swerr;
                }finally{
                    if (client) await client.end();
                }
                break;
            case process.env.PGDB_pool:
                try{
                    const config = {
                        user: process.env.PGDB_USERNAME,
                        password: process.env.PGDB_PASSWORD,
                        port: process.env.PGDB_PORT,
                    };
                    client = new Client(config);
                    configuration ='';
                    console.log(`using ${dbconnection} pool`);
                }catch(swerr){
                    throw sweer;
                }finally{
                    if (client) await client.end();
                }
                break;
        }
    }catch(err){
        throw err;
    }

    return configuration;
}