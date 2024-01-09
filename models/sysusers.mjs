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
            type: 'object',
            required: ['first_name','last_name','email'],
            properties: {
                id: {type: 'integer'},
                username: {type: 'string', minLength: 8, maxLength: 255},
                first_name: {type: 'text'},
                last_name: {type: 'text'},
                bio: {type: 'text'},
                email: {type: 'string', maxLength: 255},
                session_id: {type: 'text'},
                password: {type: 'text'},
                created_at: {type: 'datetime'},
                updated_at: {type: 'datetime'}
            }
        };
    }

}

export default new sysusers();