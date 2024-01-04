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
            t.text('item_code');
            t.text('item_name');
            t.text('details');
            t.decimal('price',10,2);
            t.decimal('initial_offer',10,2);
            t.text('image_path');
            t.timestamps(true, __schema.fn.now(8), false);
        });
    },

    down: async function down(table=tableName){
        return await __schema.schema.dropTable(table);        
    }
}

export default items_table;