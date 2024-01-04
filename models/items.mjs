import dotenv from '../configs/environment.mjs';
import orm from '../configs/dbs.mjs';
import items_table from '../migrations/items_table.mjs';

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


dotenv.config();


class items {
    async create(inputs) {
        let data;

        return data;
    }

    async resetTable(){
        const response = await items_table.down();
        return response;
    }
}

export default new items();