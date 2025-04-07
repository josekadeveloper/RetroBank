import { Router } from "express";

// Simulación de usuarios (reemplazar por DB en el futuro)
let users = [
  { username: "admin", password: "1234", balance: 1000 },
  { username: "john", password: "abcd", balance: 500 },
];

const router = Router();

router.get("/", (_req, res) => {
  res.json(users);
});

export default router;
