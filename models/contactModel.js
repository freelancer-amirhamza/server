import { poolDB } from "../config/db.config.js"



const contactModel = {
    // create data
    async create(data){
        const {id, address, email, phone}= data;
        const [response]= await poolDB.query(`INSERT INTO contact(id,address,email,phone) VALUES(?,?,?,?)`,
            [id, address, email, phone]);
            if(response.affectedRows === 0){
                return null;
            };
        const [rows] = await poolDB.execute(`SELECT * FROM contact WHERE id=?`,[id]);
        return rows[0];
    },

    // find data by id
    async findById(id){
        const [rows] = await poolDB.execute(`SELECT * FROM contact WHERE id=?`,[id]);
        return rows[0];
    },

    // find all data
    async findAll(){
        const [response] = await poolDB.execute(`SELECT * FROM contact ORDER BY created_at DESC`);
        return response;
    },

    // update data
    async update(id,data){
        const fields = [];
        const values = [];

        Object.keys(data).map((key)=>{
            if(data[key] !== undefined){
                fields.push(`${key} =?`);
                values.push(data[key]);
            }
        });

        if(fields.length ===0){
            throw new Error("No field to update");
        };

        values.push(id);
        const [response ]= await poolDB.execute(`
            UPDATE contact SET ${fields.join(", ")},
            updated_at = CURRENT_TIMESTAMP
            WHERE id=?`,values);
        return response[0];
    },

    // delete data
    async delete(id){
        const [rows] = await poolDB.execute(`SELECT * FROM contact WHERE id=?`,[id]);
        const [response]= await poolDB.execute(`DELETE FROM contact WHERE id=?`,[id]);
        if(response.affectedRows === 0){
            return null
        }
        return rows[0];
    }


}

export default contactModel;