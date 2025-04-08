import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

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

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, username: "user1", balance: 100 },
    { id: 2, username: "user2", balance: 200 },
    { id: 3, username: "user3", balance: 300 },
  ];
  res.json(users);
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      // Usuario encontrado
      res.json({ message: "Login successful", token: "dummy_token" });
    } else {
      // Usuario no encontrado
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/balance", async (req, res) => {
  const { username } = req.body;

  try {
    const result = await pool.query(
      "SELECT balance FROM users WHERE username = $1",
      [username]
    );

    console.log("result", result.rows);
    if (result.rows.length > 0) {
      res.json({ balance: result });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
