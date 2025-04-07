import { Router } from "express";

const router = Router();

// Simulación de base de datos temporal
let users = [{ username: "admin", password: "1234", balance: 1000 }];

router.post("/", (req, res) => {
  const { username, password, balance } = req.body;

  if (!username || !password || balance === undefined) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const exists = users.find((u) => u.username === username);
  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser = { username, password, balance };
  users.push(newUser);

  res.status(201).json(newUser);
});

export default router;
