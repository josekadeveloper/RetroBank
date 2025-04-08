import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = Number(process.env.PORT) || 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    res.json({ message: "Login successful", token: "dummy_token" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/welcome", (req, res) => {
  const { username } = req.body;
  res.status(200).json({ message: `Welcome ${username}` });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
