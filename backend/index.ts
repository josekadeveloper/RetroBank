import cors from "cors";
import express, { Request } from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3030;
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://retro-bank-frontend.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
    await pool.query(query);
  } catch (error) {
  } finally {
    await pool.end();
  }
};

// resetTables();

const authenticateToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader?.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET ?? "default_secret_key"
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

app.post("/api/users", authenticateToken, async (req, res) => {
  const { username } = req.body;

  try {
    const usersList = await pool.query("SELECT * FROM users");

    const userNames = [];

    if (usersList.rows.length > 0) {
      for (const row of usersList.rows) {
        if (row.username !== username) {
          userNames.push(row.username);
        }
      }

      res.status(200).json(userNames);
    } else {
      res.status(401).json({ message: "User list is empty!!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Users table on database is empty" });
  }
});

app.post(
  "/api/register",
  async (req: Request, res: express.Response): Promise<any> => {
    const { username, password, balance } = req.body;

    if (!username || !password || !balance) {
      res.status(400).json({ message: "Username and password are required" });
    }

    try {
      const userExists = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      if (userExists.rows.length > 0) {
        res.status(409).json({ message: "Username already exists" });
      }

      const hashedPassword = await argon2.hash(password);

      await pool.query(
        "INSERT INTO users (username, password, balance) VALUES ($1, $2, $3)",
        [username, hashedPassword, balance]
      );

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.post(
  "/api/login",
  async (req: express.Request, res: express.Response): Promise<any> => {
    const { username, password } = req.body;

    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = result.rows[0];

      const isPasswordValid = await argon2.verify(user.password, password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET ?? "default_secret_key",
        { expiresIn: "3m" }
      );

      return res.status(200).json({
        message: "Login successful",
        token: token,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.post("/api/balance", authenticateToken, async (req, res) => {
  const { username } = req.body;

  try {
    const result = await pool.query(
      "SELECT balance FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length > 0) {
      res.json({ balance: result.rows[0].balance.toString() });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "The Balance or Username haven't exist" });
  }
});

app.post("/api/update-balance", authenticateToken, async (req, res) => {
  const { remitter, beneficiary, balance } = req.body;

  try {
    const isRemitterExist = await pool.query(
      "SELECT balance FROM users WHERE username = $1",
      [remitter]
    );

    const isBeneficiaryExist = await pool.query(
      "SELECT balance FROM users WHERE username = $1",
      [beneficiary]
    );

    if (
      isRemitterExist.rows.length === 0 ||
      isBeneficiaryExist.rows.length === 0
    ) {
      res.status(404).json({ message: "User not found" });
    }

    const remitterResult = await pool.query(
      "SELECT balance FROM users WHERE username = $1",
      [remitter]
    );

    const beneficiaryResult = await pool.query(
      "SELECT balance FROM users WHERE username = $1",
      [beneficiary]
    );

    const remitterBalance = parseFloat(remitterResult.rows[0].balance);
    const beneficiaryBalance = parseFloat(beneficiaryResult.rows[0].balance);

    if (remitterBalance < balance) {
      res.status(400).json({ message: "Insufficient balance" });
    }

    await pool.query("UPDATE users SET balance = $1 WHERE username = $2", [
      remitterBalance - balance,
      remitter,
    ]);

    await pool.query("UPDATE users SET balance = $1 WHERE username = $2", [
      beneficiaryBalance + balance,
      beneficiary,
    ]);

    await pool.query(
      "INSERT INTO transactions (remitter, beneficiary, amount, date) VALUES ($1, $2, $3, $4)",
      [remitter, beneficiary, balance, new Date()]
    );

    res.status(200).json({ message: "Balance updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user balance" });
  }
});

app.post("/api/transactions-history", authenticateToken, async (req, res) => {
  const { username } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM transactions WHERE remitter = $1 OR beneficiary = $1",
      [username]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: "No transactions found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching transaction history" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
