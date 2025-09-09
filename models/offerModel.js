import { poolDB } from "../config/db.config.js";


const offerModel = {
    // create offer data
    async create(data){
        const {id, icon,title, description} = data;
        const response = await poolDB.query(`
            INSERT INTO offer_cards(id, icon,title, description)
            VALUES ($1,$2,$3,$4) RETURNING *
            `,[id, icon,title, description]);
            return response.rows[0];
    },

    // update data
    async update(id, data){
        const fields = [];
        const values = [];
        let paramCount = 1;

        Object.keys(data).map((key)=>{
            if(data[key] !== undefined){
                fields.push(`${key} =$${paramCount}`);
                values.push(`${data[key]}`);
                paramCount++;
            }
        });
        values.push(id);
        const response = await poolDB.query(`
            UPDATE offer_cards SET ${fields.join(", ")}
            WHERE id=$${paramCount} RETURNING *
            `, values);
            return response.rows[0];
    },

    // delete data
    async delete(id){
        const response = await poolDB.query(`DELETE FROM offer_cards WHERE id=$1 RETURNING *`,[id]);
        return response.rows[0];
    },

    // find offer data by id
    async findById(){
        const response = await poolDB.query(`SELECT * FROM offer_cards WHERE id=$1`,[id]);
        return response.rows[0];
    },

    // find all data from offer cards
    async findAll(){
        const response = await poolDB.query(`SELECT * FROM offer_cards`);
        return response.rows;
    }
};

export default offerModel;