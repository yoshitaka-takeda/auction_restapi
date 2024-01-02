import * as dbvar from '../configs/environment.mjs';
import orm from '../configs/dbs.mjs';
import users_table from '../populate/users_table.mjs';
const env = dbvar;

process.env.USERS_TABLE = 'users';
let exists = orm.__knex;

exists = await exists.schema.hasTable(process.env.USERS_TABLE).then((exists) => {
    return exists;
});

if(!exists){
    users_table.up(process.env.USERS_TABLE);
}

class users {
    async findById(id=null) {
        let data;
        data = orm.__knex.select('*')
            .from(process.env.USERS_TABLE)
            .where('id',id)
            .limit(1);
        
        return data;
    }

    async find(conditions=null){
        let data;

        // 
        if(conditions=null){
            data = orm.__knex.select(`*`)
                .from(process.env.USERS_TABLE)
                .orderBy('id','ASC');
            // data = this.findAll();
        }else{
            data = {};
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

        }).into(process.env.USERS_TABLE);
        
        return data;
    }
}

export default users;