import { poolDB } from "../config/db.config.js";



const newsModel = {
    //  create
    async create(data) {
        const { id, image, title, paragraph1, paragraph2, quote, tags, years, categories } = data;
        const response = await poolDB.query(`
                INSERT INTO news(id,image,title, paragraph1, paragraph2,quote,tags, years, categories) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
            [id, image, title, paragraph1, paragraph2, quote, tags, years, categories]);
        return response
    },

    async update(id,data){
        const fields = [];
        const values = [];
        let paramCount = 1;

        Object.keys(data).map((key)=>{
            if(data[key] !== undefined){
                fields.push(`${key}=$${paramCount}`);
                values.push(data[key]);
                paramCount++;
            }
        });
        values.push(id);
        const response = await poolDB.query(`
            UPDATE news SET ${fields.join(", ")}
            WHERE id=$${paramCount} RETURNING *
            `,values);
            return response.rows[0];
    },

    // delete data
    async delete(id){
        const response = await poolDB.query(`DELETE FROM news WHERE id=$1 RETURNING *`,[id]);
        return response.rows[0];
    },

    // find data by id
    async findById(id){
        const response = await poolDB.query(`SELECT * FROM news WHERE id=$1`,[id]);
        return response.rows[0];
    },

    // find all data
    async findAll(){
        const response = await poolDB.query(`SELECT * FROM news`);
        return response.rows;
    }
}

export default newsModel;
