import { poolDB } from "../config/db.config.js";



const serviceModel = {
    // create data
    async create(data){
        const {image, title, description, category,icon,id}=data;
        const response =await poolDB.query(`
            INSERT INTO service_cards(id,image, title, description, category,icon)
            VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
        [id,image, title, description, category,icon]);
        return response.rows[0];
    },

    // update data
     async update(id,data){
        const fields = [];
        const values = [];
        let paramCount = 1;

        Object.keys(data).map((key)=>{
            if(data[key] !== undefined){
                fields.push(`${key} = $${paramCount}`);
                values.push(data[key]);
                paramCount++;
            }
        });

        if(fields.length === 0){
            throw new Error("No fields to update");
        }

        values.push(id);
        const result = await poolDB.query(`
            UPDATE service_cards SET ${fields.join(", ")}
            WHERE id =$${paramCount} RETURNING *`,
        values);
        return result.rows[0];
    },

    // delete data
    async delete(id){
        const response = await poolDB.query(`DELETE FORM service_cards WHERE id=$1 RETURNING *`,[id]);
        return response.rows[0];
    },

    // find data by id
    async findById(id){
        const response = await poolDB.query(`SELECT * FROM service_cards WHERE id=$1`,[id]);
        return response.rows[0];
    },

    // find add data
    async findAll(){
        const response = await poolDB.query(`SELECT * FROM service_cards`);
        return response.rows;
    }
};


export default serviceModel;