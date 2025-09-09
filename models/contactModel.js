import { poolDB } from "../config/db.config.js"



const contactModel = {
    // create data
    async create(data){
        const {id, address, email, phone}= data;
        const response = await poolDB.query(`INSERT INTO contact(id,address,email,phone) VALUES($1,$2,$3,$4) RETURNING *`,
            [id, address, email, phone]);
            return response.rows[0];
    },

    // find data by id
    async findById(id){
        const response = await poolDB.query(`SELECT * FROM contact WHERE id=$1`,[id]);
        return response.rows[0];
    },

    // find all data
    async findAll(){
        const response = await poolDB.query(`SELECT * FROM contact ORDER BY created_at DESC`);
        return response.rows;
    },

    // update data
    async update(id,data){
        const fields = [];
        const values = [];
        let paramCount = 1;

        Object.keys(data).map((key)=>{
            if(data[key] !== undefined){
                fields.push(`${key} =$${paramCount}`);
                values.push(data[key]);
                paramCount++;
            }
        });

        if(fields.length ===0){
            throw new Error("No field to update");
        };

        values.push(id);
        const response = await poolDB.query(`
            UPDATE contact SET ${fields.join(", ")},
            updated_at = CURRENT_TIMESTAMP
            WHERE id=$${paramCount} RETURNING *`,
        values);
        return response.rows[0];
    },

    // delete data
    async delete(id){
        const response = await poolDB.query(`DELETE FROM contact WHERE id=$1 RETURNING *`,[id]);
        return response.rows[0];
    }


}

export default contactModel;