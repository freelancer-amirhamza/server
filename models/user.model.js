import { poolDB } from "../config/db.config.js";

const userModel = {
    async create(userData) {
        const { username, email, password, fullname, phone, image ,id} = userData;

        await poolDB.execute(`
            INSERT INTO users (username, email, password, fullname, phone, image,id)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [username, email, password, fullname || "", phone || "", image || "",id]
        );

    // Get the complete inserted user
    const [rows] = await poolDB.execute(
        "SELECT * FROM users WHERE id = ?",
        [id]
    );

        return rows[0];
    },

    // find user by id
    async findById(id) {
        const [rows] = await poolDB.execute(
            `SELECT id, username, fullname, email, phone, image, role 
             FROM users WHERE id = ?`,
            [id]
        );
        return rows[0];
    },

    // find user by username
    async findByUsername(username) {
        const [rows] = await poolDB.execute(
            `SELECT * FROM users WHERE username = ?`,
            [username]
        );
        return rows[0];
    },

    // find user by email
    async findByEmail(email) {
        const [rows] = await poolDB.execute(
            `SELECT id, username, fullname, email, phone, image, role 
             FROM users WHERE email = ?`,
            [email]
        );
        return rows[0];
    },

    // update user
    async update(id, data) {
        const fields = [];
        const values = [];

        Object.keys(data).forEach((key) => {
            if (data[key] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(data[key]);
            }
        });

        if (fields.length === 0) {
            throw new Error("No fields to update");
        }

        // Add updated_at field
        fields.push("updated_at = CURRENT_TIMESTAMP");
        values.push(id);

        const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

        const [result] = await poolDB.execute(sql, values);

        if (result.affectedRows === 0) {
            return null;
        }

        // Get the updated user
        const [rows] = await poolDB.execute(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );
        return rows[0];
    },

    // delete user
    async delete(id) {
        // First get the user to return later
        const [userRows] = await poolDB.execute(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );

        const [result] = await poolDB.execute(
            "DELETE FROM users WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return null;
        }

        return userRows[0];
    },

    // get all users
    async findAll() {
        const [rows] = await poolDB.execute(
            `SELECT id, username, email, fullname, phone, image, role 
             FROM users ORDER BY created_at DESC`
        );
        return rows;
    },

    // Additional helper method for login/authentication
    async findByUsernameOrEmail(identifier) {
        const [rows] = await poolDB.execute(
            `SELECT * FROM users WHERE username = ? OR email = ?`,
            [identifier, identifier]
        );
        return rows[0];
    }
};

export default userModel;