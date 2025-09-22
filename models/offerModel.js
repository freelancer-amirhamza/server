import { poolDB } from "../config/db.config.js";


const offerModel = {
    // create offer data
    async create(data){
        const {id, icon,title, description} = data;
         await poolDB.execute(`
            INSERT INTO offer_cards(id, icon,title, description)
            VALUES (?,?,?,?)`,[id, icon,title, description]);

            const [response] = await poolDB.execute(`SELECT * FROM offer_cards WHERE id=?`,[id])
            return response[0];
    },

    // update data
    async update(id, data){
        const fields = [];
        const values = [];

        Object.keys(data).map((key)=>{
            if(data[key] !== undefined){
                fields.push(`${key} =?`);
                values.push(`${data[key]}`);
            }
        });
        values.push(id);
        const [response] = await poolDB.execute(`
            UPDATE offer_cards SET ${fields.join(", ")}
            WHERE id=?`, values);
            return response[0];
    },

    // delete data
    async delete(id){
        await poolDB.execute(`DELETE FROM offer_cards WHERE id=?`,[id]);
        const [response] = await poolDB.execute(`SELECT * FROM offer_cards WHERE id=?`,[id]);
        return response[0];
    },

    // find offer data by id
    async findById(){
        const [response] = await poolDB.execute(`SELECT * FROM offer_cards WHERE id=?`,[id]);
        return response[0];
    },

    // find all data from offer cards
    async findAll(){
        const [response] = await poolDB.execute(`SELECT * FROM offer_cards`);
        return response;
    }
};

export default offerModel;