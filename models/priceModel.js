import { poolDB } from "../config/db.config.js"

const priceModel = {
    async create(data) {
        const { id, title, price, options } = data;
        const optionsJson = JSON.stringify(options);
        const [response] = await poolDB.query(
            `INSERT INTO price_cards (id, title, price, options)
            VALUES (?, ?, ?, ?)`,
            [id, title, price, optionsJson]
        );
        if (response.affectedRows === 0) {
            return null;
        }
        const [rows] = await poolDB.execute(
            `SELECT * FROM price_cards WHERE id = ?`,
            [id]
        );
        return rows[0];
    },

    async update(id, data) {
        const { title, price, options } = data;
        const jOptions = JSON.stringify(options);
        const [response] = await poolDB.execute(`UPDATE price_cards SET title=?, price=?, options=?  WHERE id=?`,
            [title, price, jOptions, id]);
        if (response.affectedRows === 0) return null;
        const [rows] = await poolDB.execute(
            `SELECT * FROM price_cards WHERE id = ?`,
            [id]
        );
        return rows[0];
    },
    async delete(id) {
        const [rows] = await poolDB.execute(`SELECT * FROM price_cards WHERE id=?`, [id]);
        const [response] = await poolDB.execute(`DELETE FROM price_cards WHERE id=?`, [id]);
        if (response.affectedRows === 0) return null
        return rows[0]
    },
    async findById(id) {
        const [rows] = await poolDB.execute(`SELECT * FROM price_cards WHERE id=?`, [id]);
        return rows[0]
    },
    async findAll() {
        const [rows] = await poolDB.execute(`SELECT * FROM price_cards`,);
        return rows;
    }
}

export default priceModel;