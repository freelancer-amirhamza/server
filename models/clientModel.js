import { poolDB } from "../config/db.config.js";



const clientModel = {
    // create client data
    async create(data){
        const {id, image, title,description}=data;
        const response = await poolDB.query(`
            INSERT INTO clients(id, image, title,description)VALUES($1,$2,$3,$4) RETURNING *`,
            [id, image, title,description]
        );
        return response.rows[0];
    },
        // update client data
        async update(id,data){
            const fields = [];
            const values = [];
            let paramCount = 1;

            Object.keys(data).map((key)=>{
                if(data[key] !== undefined){
                    fields.push(`${key} = $${paramCount}`);
                    values.push(`${data[key]}`);
                    paramCount++;
                };
            });
            values.push(id);
                const response = await poolDB.query(`
                    UPDATE clients SET ${fields.join(", ")}
                    WHERE id=$${paramCount} RETURNING *`, values);
                return response.rows[0];
        },

        // delete data
        async delete(id){
            const response = await poolDB.query(`DELETE FROM clients WHERE id=$1 RETURNING *`,[id]);
            return response.rows[0];
        },

        // find client data by id
        async findById(id){
            const response = await poolDB.query(`SELECT * FROM clients WHERE id=$1`,[id]);
            return response.rows[0];
        },

        // find client all data
        async findAll(){
            const response = await poolDB.query(`SELECT * FROM clients`);
            return response.rows;
        }
};

export default clientModel;