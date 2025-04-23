import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const resetTables = async () => {
  const query = `
    DROP TABLE IF EXISTS transactions;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        balance NUMERIC DEFAULT 0
    );

    CREATE TABLE transactions (
        id SERIAL PRIMARY KEY,
        remitter VARCHAR(255) NOT NULL,
        beneficiary VARCHAR(255) NOT NULL,
        amount NUMERIC NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (remitter) REFERENCES users(username) ON DELETE CASCADE,
        FOREIGN KEY (beneficiary) REFERENCES users(username) ON DELETE CASCADE
    );
  `;

  try {
    console.log("Resetting tables...");
    await pool.query(query);
    console.log("Tables reset successfully!");
  } catch (error) {
    console.error("Error resetting tables:", error);
  } finally {
    await pool.end();
    console.log("Database connection closed.");
  }
};

resetTables();
