import { poolDB } from "../config/db.config.js";


const heroModel = {
    async create(data){
        const {id, heading, title, text,image}= data;
        await poolDB.execute(`
            INSERT INTO bannerslide(id,heading, title, text, image) VALUES(?,?,?,?,?)
            `,[id, heading, title, text,image]);
        const [rows] = await poolDB.execute(`SELECT * FROM bannerslide WHERE id=?`,[id]);
        return rows[0];
    },

    // update hero data
    async update(id, data){
        const fields = [];
        const values = [];

        Object.keys(data).map((key)=>{
            if(data[key] !== undefined){
                fields.push(`${key}=?`);
                values.push(data[key]);
            }
        })
        values.push(id);
        const [response] = await poolDB.execute(`UPDATE bannerslide SET ${fields.join(", ")} WHERE id=?`,values);
        if(response.affectedRows === 0){
            return null;
        };

        const [rows] = await poolDB.execute(`SELECT * FROM bannerslide WHERE id=?`,[id]);
        return rows[0];
    },

    // delete data
    async delete(id){
        const [response] =  await poolDB.execute(`DELETE FROM bannerslide WHERE id=?`,[id]);
        const [rows] = await poolDB.execute(`SELECT * FROM bannerslide WHERE id=?`,[id]);
        if(response.affectedRows === 0){
            return null;
        }
        return rows[0];
    },

    // findById
    async findById(id){
        const [rows] = await poolDB.execute(`SELECT * FROM bannerslide WHERE id=?`,[id]);
        return rows[0];
    },

    // find all data
    async findAll(){
        const [rows] = await poolDB.execute(`SELECT * FROM bannerslide`);
        return rows;
    }
};

export default heroModel