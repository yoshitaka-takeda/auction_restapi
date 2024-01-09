'use strict';
import dotenv from '../configs/environment.mjs';
import orm from '../configs/dbs.mjs';

dotenv.config();
process.env.SYSUSERS_TABLE = 'sysusers';
const tableName = process.env.SYSUSERS_TABLE;

let __schema = orm.__knex;

let sysusers_table = {
    up: async function up(table=tableName){
        return await __schema.schema.createTable(table, function(t) {
            t.increments('id').primary();
            t.string('username',255);
            t.text('first_name').notNullable();
            t.text('last_name').notNullable();
            t.text('bio');
            // t.text('personal_uuid');
            t.string('email',255).notNullable();
            t.text('session_id');
            t.text('password');
            t.timestamps(true, __schema.fn.now(8), false);
        });
    },

    down: async function down(table=tableName){
        return await __schema.schema.dropTable(table);
        
    }
}

export default sysusers_table;