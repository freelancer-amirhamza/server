import { poolDB } from "../config/db.config.js";



const testimonialModel = {
    // create data
    async create(data){
        const {id,image, name, title, description}= data;
        const response = await poolDB.query(`
            INSERT INTO testimonials(id, image, name, title, description)
            VALUES($1,$2,$3,$4,$5) RETURNING *`,
            [id,image, name, title, description]
        );
        return response.rows[0];
    },

    // update data
    async update(id,data){
        const fields = [];
        const values = [];
        let paramCount = 1;

        Object.keys(data).map((key)=>{
            if(data[key] !== undefined){
                fields.push(`${key}=$${paramCount}`);
                values.push(`${data[key]}`);
                paramCount++;
            }
        })
        values.push(id);
        const response = await poolDB.query(`
            UPDATE testimonials SET ${fields.join(", ")}
            WHERE id=$${paramCount} RETURNING *
            `,values);
            return response.rows[0];
    },

    async delete(id){
        const response = await poolDB.query(`DELETE FROM testimonials WHERE id=$1 RETURNING *`,[id]);
        return response.rows[0]
    },

    // FIND DATA BY ID

    async findById(id){
        const response = await poolDB.query(`SELECT * FROM testimonials WHERE id=$1`, [id]);
        return response.rows[0];
    },

    // find all data
    async findAll(){
        const response = await poolDB.query(`SELECT * FROM testimonials`);
        return response.rows;
    }

};


export default testimonialModel;