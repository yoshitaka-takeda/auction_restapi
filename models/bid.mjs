import dotenv from "../configs/environment.mjs";
import orm from '../configs/dbs.mjs';
import biddings_table from '../migrations/biddings_table.mjs';

dotenv.config();
process.env.BIDDINGS_TABLE = 'biddings';
let exists = orm.__knex;

exists = await exists.schema.hasTable(process.env.BIDDINGS_TABLE).then((exists) => {
    return exists;
});

if(!exists){
    biddings_table.up(process.env.BIDDINGS_TABLE);
}

class bid {
    async create(input){
        let data;

        return data;
    }

    async resetTable(){
        const response = await biddings_table.down(process.env.BIDDINGS_TABLE);
        return response;
    }
}

export default new bid();