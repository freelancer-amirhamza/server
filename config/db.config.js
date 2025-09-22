import mysql from "mysql2/promise"; // Use promise-based API
import { config } from "dotenv";
config();

// ============== MySQL database config for local server =========

export const poolDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306, // MySQL default port
  waitForConnections: true,
  connectionLimit: 5, // Similar to max: 5
  queueLimit: 0,
  idleTimeout: 10000, // Similar to idleTimeoutMillis
  connectTimeout: 30000, // Similar to connectionTimeoutMillis
  charset: 'utf8mb4' // Recommended for full Unicode support
});


async function testConnection() {
  let connection;
  try {
    connection = await poolDB.getConnection();
    const [rows] = await connection.execute("SELECT NOW()");
    console.log("MySQL Database connected successfully:", rows[0]);
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("MySQL Database connection error:", error);
    if (connection) connection.release(); // Make sure to release on error too
  }
}

testConnection();

// ================= MySQL database config for production server =========

// For production with SSL (like Render, AWS, etc.)
/*
export const poolDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
  ssl: {
    rejectUnauthorized: false // Similar to PostgreSQL ssl config
  },
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  idleTimeout: 10000,
  connectTimeout: 30000,
  charset: 'utf8mb4'
});
*/
