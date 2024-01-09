'use strict';
import dotenv from '../configs/environment.mjs';
import orm from '../configs/dbs.mjs';
import items_table from '../migrations/items_table.mjs';
import { Model } from 'objection';

dotenv.config();
const env = dotenv.config();

console.log(env);
process.env.ITEMS_TABLE = 'biddings';
let exists = orm.__knex;

exists = await exists.schema.hasTable(process.env.ITEMS_TABLE).then((exists) => {
    return exists;
});

if(!exists){
    items_table.up(process.env.ITEMS_TABLE);
}

class items extends Model {
    static get tableName() {
        return process.env.ITEMS_TABLE;
    }

    async create(inputs) {
        let data;

        return data;
    }

    async resetTable() {
        const response = await items_table.down();
        return response;
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['item_code','item_name','price','initial_offer'],
            properties: {
                id: {type: 'integer'},
                item_code: {type: 'text'},
                item_name: {type: 'text'},
                details: {type: 'text'},
                price: {type: 'decimal'},
                initial_offer: {type: 'decimal'},
                image_path: {type: 'text'},
                sysuser_id: {type: 'integer'},
                created_at: {type: 'datetime'},
                updated_at: {type: 'datetime'}
            }
        };
    }

    static get relationMappings() {
        const sysusers = import('./sysusers.mjs');

        return {

        };
    }
}

export default new items();