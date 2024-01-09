'use strict';

import dotenv from '../configs/environment.mjs';
import orm from '../configs/dbs.mjs';
import users_table from '../migrations/users_table.mjs';
import { Model } from 'objection';

dotenv.config();
const env = dotenv.config();
console.log(env);
process.env.USERS_TABLE = 'users';
let exists = orm.__knex;

exists = await exists.schema.hasTable(process.env.USERS_TABLE).then((exists) => {
    return exists;
});

if(!exists){
    users_table.up(process.env.USERS_TABLE);
}

class users extends Model {
    static get tableName() {
        return process.env.USERS_TABLE;
    }

    async findById(id) {
        let data;
        data = orm.__knex.select('*')
            .from(process.env.USERS_TABLE)
            .where('id',id)
            .limit(1);
        
        return data;
    }

    async find(conditions){
        let data;

        // exactly findAll
        if(conditions.length===0){
            // data = orm.__knex.select(`*`)
            //     .from(process.env.USERS_TABLE)
            //     .orderBy('id','ASC');
            data = this.findAll();
        }else{
            data = orm.__knex.select(`*`)
                .from(process.env.USERS_TABLE)
                .where(conditions)
                .orderBy('id', 'ASC');
        }

        return data;
    }

    async findAll(){
        let data;
        
        data = orm.__knex.select(`*`)
            .from(process.env.USERS_TABLE)
            .orderBy('id','ASC');
    
        return data;
    }

    async create(userdata){
        let data;

        data = orm.__knex.insert({
            username: userdata.username,
            first_name: userdata.first_name,
            last_name: userdata.last_name,
            bio: userdata.bio,
            email: userdata.email,
            session_id: userdata.session_id,
            password: userdata.password
        }).into(process.env.USERS_TABLE);
        
        return data;
    }

    async update(userdata){
        let data;

        return data;
    }

    async delete(userdata){

    }

    async disable(userdata){
        let data;

        return data;
    }

    async resetTable(){
        const response = await users_table.down(process.env.USERS_TABLE);
        return response;
    }

    static get jsonSchema(){
        return
    }
}

export default new users();