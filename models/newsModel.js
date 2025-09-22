import { poolDB } from "../config/db.config.js";



const newsModel = {
    //  create
    async create(data) {
        const { id, image, title, paragraph1, paragraph2, quote, tags, years, categories } = data;
        const [response] = await poolDB.execute(`
                INSERT INTO news(id,image,title, paragraph1, paragraph2,quote,tags, years, categories) VALUES(?,?,?,?,?,?,?,?,?)`,
            [id, image, title, paragraph1, paragraph2, quote, tags, years, categories]);
        if(response.affectedRows === 0){
            return null
        }
        const [rows] = await poolDB.execute(`SELECT * FROM news WHERE id=?`,[id]);
        return rows[0]
    },

    async update(id,data){
        const fields = [];
        const values = [];

        Object.keys(data).map((key)=>{
            if(data[key] !== undefined){
                fields.push(`${key}=?`);
                values.push(data[key]);
            }
        });
        values.push(id);
        const [response] = await poolDB.query(`
            UPDATE news SET ${fields.join(", ")}
            WHERE id=?`,values);
        if(response.affectedRows == 0){
            return null
        }
        const [rows] = await poolDB.execute(`SELECT * FROM news WHERE id=?`,[id]);
        return rows[0]
    },

    // delete data
    async delete(id){
        const [rows] = await poolDB.execute(`SELECT * FROM news WHERE id=?`,[id]);
        const [response] = await poolDB.execute(`DELETE FROM news WHERE id=?`,[id]);
        if(response.affectedRows === 0){
            return null
        }
        return rows[0];
    },

    // find data by id
    async findById(id){
        const [rows] = await poolDB.execute(`SELECT * FROM news WHERE id=?`,[id]);
        return rows[0]
    },

    // find all data
    async findAll(){
        const [response] = await poolDB.execute(`SELECT * FROM news`);
        return response;
    }
}

export default newsModel;
