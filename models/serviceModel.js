import { poolDB } from "../config/db.config.js";


const serviceModel = {
    // create data
    async create(data){
        const {image, title, description, category,icon,id}=data;
        await poolDB.execute(`
            INSERT INTO service_cards(id,image, title, description, category,icon)
            VALUES(?,?,?,?,?,?)`,
        [id,image, title, description, category,icon]);

        const rows = await poolDB.execute(`SELECT * FROM service_cards WHERE id=?`,[id])
        return rows[0];
    },

    // update data
     async update(id,data){
        const fields = [];
        const values = [];

        Object.keys(data).map((key)=>{
            if(data[key] !== undefined){
                fields.push(`${key} = ?`);
                values.push(data[key]);
            }
        });
        if(fields.length === 0){
            throw new Error("No fields to update");
        }
        values.push(id);
        const [result] = await poolDB.execute(`
            UPDATE service_cards SET ${fields.join(", ")}
            WHERE id = ?`,values);
        if(result.affectedRows === 0){
            return null
        }

        const [rows] = await poolDB.execute(`SELECT * FROM service_cards WHERE id=?`,[id]);
        return rows[0];
    },

    // delete data
    async delete(id){
         const [rows] = await poolDB.execute(`SELECT * FROM service_cards WHERE id=?`,[id]);
        const [response] = await poolDB.execute(`DELETE FORM service_cards WHERE id=?`,[id]);
        if(response.affectedRows === 0) return null;
        return rows[0];
    },

    // find data by id
    async findById(id){
        const [rows] = await poolDB.execute(`SELECT * FROM service_cards WHERE id=?`,[id]);
        return rows[0];
    },

    // find add data
    async findAll(){
        const [rows] = await poolDB.execute(`SELECT * FROM service_cards`);
        return rows;
    }
};


export default serviceModel;