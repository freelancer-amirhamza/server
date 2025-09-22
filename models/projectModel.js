import { poolDB } from "../config/db.config.js"



const projectModel = {
    async create(data){
        const {id,image,title,description,location,size,year, categories,client}= data;
        const [response] = await poolDB.query(`
            INSERT INTO project_cards (id,image,title,description,location,size,year, categories,client)
            VALUES (?,?,?,?,?,?,?,?,?)`,
            [id,image,title,description,location,size,year, categories,client]
        );
        if(response.affectedRows === 0){
            return null;
        }
        const [rows] = await poolDB.execute(`SELECT * FROM project_cards WHERE id=?`,[id])
        return rows[0];
    },

    async update(id,data){
        const fields = [];
        const values = [];


        Object.keys(data).map((key)=>{
            if(data[key] !== undefined){
                fields.push(`${key} = ?`);
                values.push(data[key]);
            }
        });

        values.push(id)
        const [response] = await poolDB.execute(`
            UPDATE project_cards SET ${fields.join(", ")}
            WHERE id=?`,values);
        if(response.affectedRows === 0){
            return null;
        }
        const [rows] = await poolDB.execute(`SELECT * FROM project_cards WHERE id=?`,[id])
        return rows[0];
    },
    async delete(id){
        const [rows] = await poolDB.execute(`SELECT * FROM project_cards WHERE id=?`,[id])
        const [response ]= await poolDB.execute(`DELETE FROM project_cards WHERE id=?`,[id]);
        if(response.affectedRows === 0){
            return null;
        }
        return rows[0];
    },

    async findById(id){
        if(response.affectedRows === 0){
            return null;
        }
        const [rows] = await poolDB.execute(`SELECT * FROM project_cards WHERE id=?`,[id])
        return rows[0];
    },

    async findAll(){
        const [rows]= await poolDB.execute(`SELECT * FROM project_cards  ORDER BY title`);
        return rows
    }
}

export default projectModel;