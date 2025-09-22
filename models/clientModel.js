import { poolDB } from "../config/db.config.js";



const clientModel = {
    // create client data

    async create(data) {
        const { id, image, title, description } = data;

        const [response] = await poolDB.execute(`
            INSERT INTO clients(id, image, title,description) VALUES(?,?,?,?)`,
            [id, image, title, description]
        );
        if (response.affectedRows === 0) {
            return null
        }
        const [rows] = await poolDB.execute(`SELECT * FROM clients WHERE id=?`,[id])
        return rows[0];
    },
    // update client data
    async update(id, data) {
        const fields = [];
        const values = [];

        Object.keys(data).map((key) => {
            if (data[key] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(`${data[key]}`);
            };
        });
        values.push(id);
        const [response] = await poolDB.execute(`
                    UPDATE clients SET ${fields.join(", ")}
                    WHERE id=?`, values);
        if (response.affectedRows === 0) {
            return null
        }

        const [rows] = await poolDB.execute(`SELECT * FROM clients WHERE id=?`,[id])
        return rows[0];
    },

    // delete data
    async delete(id) {
        const [rows] = await poolDB.execute(`SELECT * FROM clients WHERE id=?`,[id])
        const [response] = await poolDB.execute(`DELETE FROM clients WHERE id=?`, [id]);
        if(response.affectedRows === 0 ){
            return null
        }
        return rows[0];
    },

    // find client data by id
    async findById(id) {
        const response = await poolDB.execute(`SELECT * FROM clients WHERE id=?`, [id]);
        return response[0];
    },

    // find client all data
    async findAll() {
        const [response] = await poolDB.execute(`SELECT * FROM clients`);
        return response;
    }
};

export default clientModel;