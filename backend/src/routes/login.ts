import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  const { username, password } = req.body;

  // Aquí iría la lógica real, ahora un mock temporal:
  if (username === "admin" && password === "1234") {
    return res.json({ username, balance: 1000 });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

export default router;
