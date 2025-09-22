import { poolDB } from "../config/db.config.js"


const teemModel = {
    async create(data){
        const {id, name, title, image, description} = data;
        const [response] = await poolDB.execute(`
            INSERT INTO teems(id, name, title, image, description) VALUES(?,?,?,?,?)
            `,[id, name, title, image, description]);
        if(response.affectedRows === 0){
            return null
        };
        const [rows] = await poolDB.execute(`SELECT * FROM teems WHERE id=?`,[id]);
        return rows[0];
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
        const [response] = await poolDB.execute(`UPDATE teems SET ${fields.join(", ")} WHERE id=?`,values);
        if(response.affectedRows === 0){
            return null
        };
        const [rows] = await poolDB.execute(`SELECT * FROM teems WHERE id=?`,[id]);
        return rows[0];
    },

    async delete(id){
        const [rows] = await poolDB.execute(`SELECT * FROM teems WHERE id=?`,[id]);
        const [response] = await poolDB.execute(`DELETE FROM teems WHERE id=?`,[id])
        if(response.affectedRows === 0){
            return null;
        }
        return rows[0]
    },
    async findById(id){
        const [rows] = await poolDB.execute(`SELECT * FROM teems WHERE id=?`,[id]);
        return rows[0];
    },
    async findAll(){
        const [rows] = await poolDB.execute(`SELECT * FROM teems`);
        return rows;
    }
};

export default teemModel;