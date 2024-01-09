'use strict';
import dotenv from '../configs/environment.mjs';
import orm from '../configs/dbs.mjs';

dotenv.config();
process.env.USERS_TABLE = 'userstorage';
const tableName = process.env.USERS_TABLE;

let __schema = orm.__knex;

let userstorage_table = {
    up: async function up(table=tableName){
        return await __schema.schema.createTable(table, function(t) {
            t.increments('id').primary();
            t.integer('user_id',10);
            t.text('original_key');
            t.text('cryptic_key');
            t.timestamps(true, __schema.fn.now(8), false);
        });
    },

    down: async function down(table=tableName){
        return await __schema.schema.dropTable(table);
        
    }
}

export default userstorage_table;