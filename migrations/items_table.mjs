import * as dbvar from '../configs/environment.mjs';
import orm from '../configs/dbs.mjs';

process.env.ITEMS_TABLE = 'items';
const tableName = process.env.ITEMS_TABLE;

let __schema = orm.__knex;

let users_table = {
    up: async function up(table=tableName){
        return await __schema.schema.createTable(table, function(t) {
            t.increments('id').primary();
            
            t.timestamps(true, __schema.fn.now(8), false);
        });
    },

    down: async function down(table=tableName){
        return await __schema.schema.dropTable(table);
        
    }
}

export default users_table;