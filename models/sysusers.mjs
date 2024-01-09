'use strict';
import dotenv from '../configs/environment.mjs';
import orm from '../configs/dbs.mjs';
import sysusers_table from '../migrations/sysusers_table.mjs';
import { Model } from 'objection';

dotenv.config();
process.env.SYSUSERS_TABLE = 'sysusers';
let exists = orm.__knex;

exists = await exists.schema.hasTable(process.env.SYSUSERS_TABLE).then((exists) => {
    return exists;
});

if(!exists){
    sysusers_table.up(process.env.SYSUSERS_TABLE);
}

class sysusers extends Model {
    static get tableName() {
        return process.env.SYSUSERS_TABLE;
    }

    static get jsonSchema() {
        return {

        };
    }

    static get relationMappings() {
        return {

        };
    }
}

export default new sysusers();