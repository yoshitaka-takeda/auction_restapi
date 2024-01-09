'use strict';
import dotenv from '../configs/environment.mjs';
import orm from '../configs/dbs.mjs';

dotenv.config();
process.env.ITEMS_TABLE = 'items';
const tableName = process.env.ITEMS_TABLE;

let __schema = orm.__knex;

let items_table = {
    up: async function up(table=tableName){
        return await __schema.schema.createTable(table, function(t) {
            t.increments('id').primary();
            t.text('item_code').notNullable();
            t.text('item_name').notNullable();
            t.text('details');
            t.decimal('price',12,4).notNullable().checkPositive();
            t.decimal('initial_offer',12,4).notNullable().checkPositive();
            t.check('?? >= ??','initial_offer','price');
            t.text('image_path');
            t.integer('sysuser_id').unsigned();
            t.foreign('sysuser_id').references('id').inTable('sysusers');
            t.timestamps(true, __schema.fn.now(8), false);
        });
    },

    down: async function down(table=tableName){
        return await __schema.schema.dropTable(table);        
    }
}

export default items_table;