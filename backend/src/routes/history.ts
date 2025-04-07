import { Router } from "express";

const router = Router();

// Simulación de historial de transacciones
let history: any[] = [];

router.get("/", (_req, res) => {
  res.json(history);
});

router.post("/", (req, res) => {
  const { from, to, amount, date } = req.body;
  if (!from || !to || !amount || !date) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const transaction = { from, to, amount, date };
  history.unshift(transaction);

  res.status(201).json(transaction);
});

export default router;
