import { poolDB } from "../config/db.config.js";



const testimonialModel = {
    // create data
    async create(data){
        const {id,image, name, title, description}= data;
        const [response] = await poolDB.execute(`
            INSERT INTO testimonials(id, image, name, title, description)
            VALUES(?,?,?,?,?)`,
            [id,image, name, title, description]
        );
        if(response.affectedRows === 0){
            return null
        }
        const [rows] = await poolDB.execute(`SELECT * FROM testimonials WHERE id=?`,[id]);
        return rows[0];
    },

    // update data
    async update(id,data){
        const fields = [];
        const values = [];

        Object.keys(data).map((key)=>{
            if(data[key] !== undefined){
                fields.push(`${key}=?`);
                values.push(`${data[key]}`);
            }
        })
        values.push(id);
        const [response] = await poolDB.query(`
            UPDATE testimonials SET ${fields.join(", ")}
            WHERE id=?`,values);
        if(response.affectedRows == 0){
            return null
        }
        const [rows] = await poolDB.execute(`SELECT * FROM testimonials WHERE id=?`,[id]);
        return rows[0];
    },

    async delete(id){
         const [rows] = await poolDB.execute(`SELECT * FROM testimonials WHERE id=?`,[id]);
        const [response] = await poolDB.execute(`DELETE FROM testimonials WHERE id=?`,[id]);
        if(response.affectedRows === 0){
            return null
        }
        return rows[0];
    },

    // FIND DATA BY ID

    async findById(id){
        const [rows] = await poolDB.execute(`SELECT * FROM testimonials WHERE id=?`,[id]);
        return rows[0];
    },

    // find all data
    async findAll(){
        const [rows] = await poolDB.execute(`SELECT * FROM testimonials`);
        return rows;
    }

};


export default testimonialModel;