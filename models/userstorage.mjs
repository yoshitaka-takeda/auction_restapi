import dotenv from '../configs/environment.mjs';
import orm from '../configs/dbs.mjs';
import users_table from '../migrations/userstorage_table.mjs';
dotenv.config();

process.env.USERSTORAGE_TABLE = 'userstorage';
let exists = orm.__knex;

exists = await exists.schema.hasTable(process.env.USERSTORAGE_TABLE).then((exists) => {
    return exists;
});

if(!exists){
    users_table.up(process.env.USERSTORAGE_TABLE);
}

class users {
    async getTableName() {
        return process.env.USERSTORAGE_TABLE;
    }

    async findById(id){
        let data;

        data = orm.__knex.select('*')
            .from(process.env.USERSTORAGE_TABLE)
            .where('id',id)
            .limit(1);

        return data;
    }

    async findByUserId(id) {
        let data;
        data = orm.__knex.select('*')
            .from(process.env.USERSTORAGE_TABLE)
            .where('user_id',id)
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
                .from(process.env.USERSTORAGE_TABLE)
                .where(conditions)
                .orderBy('id', 'ASC');
        }

        return data;
    }

    async findAll(){
        let data;
        
        data = orm.__knex.select(`*`)
            .from(process.env.USERSTORAGE_TABLE)
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
        }).into(process.env.USERSTORAGE_TABLE);
        
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
}

export default new users();