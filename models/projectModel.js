import { poolDB } from "../config/db.config.js"



const projectModel = {
    async create(data){
        const {id,image,title,description,location,size,year, categories,client}= data;
        const response = await poolDB.query(`
            INSERT INTO project_cards (id,image,title,description,location,size,year, categories,client)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
            [id,image,title,description,location,size,year, categories,client]
        );
        return response.rows[0];
    },

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

        values.push(id)
        const response = await poolDB.query(`
            UPDATE project_cards SET ${fields.join(", ")}
            WHERE id=$${paramCount} RETURNING *`,
        values);
        return response.rows[0]
    },
    async delete(id){
        const response = await poolDB.query(`DELETE FROM project_cards WHERE id=$1 RETURNING *`,[id]);
        return response.rows[0]
    },

    async findById(id){
        const response = await poolDB.query(`SELECT * FROM project_cards WHERE id=$1`,[id])
        return response.rows[0];
    },

    async findAll(){
        const response = await poolDB.query(`SELECT * FROM project_cards`);
        return response.rows
    }
}

export default projectModel;