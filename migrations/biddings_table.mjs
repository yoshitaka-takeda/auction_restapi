'use strict';
import dotenv from '../configs/environment.mjs';
import orm from '../configs/dbs.mjs';

dotenv.config();
process.env.BIDDINGS_TABLE = 'biddings';
const tableName = process.env.BIDDINGS_TABLE;

let __schema = orm.__knex;

let biddings_table = {
    up: async function up(table=tableName){
        return await __schema.schema.createTable(table, function(t) {
            t.increments('id').primary();
            t.integer('user_id',10).references('id').inTable('users');
            t.integer('item_id',10).references('id').inTable('items');
            t.decimal('last_max_price',10,2);
            t.decimal('bid_placed',10,2);
            
            t.timestamps(true, __schema.fn.now(8), false);
        });
    },

    down: async function down(table=tableName){
        return await __schema.schema.dropTable(table);        
    }
}

export default biddings_table;