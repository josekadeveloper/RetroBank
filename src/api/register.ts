import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const { username, password, balance } = req.body;

    if (!username || !password || !balance) {
      return res
        .status(400)
        .json({ error: "Usuario y contraseña son requeridos" });
    }

    const newUser = { id: 2, username, balance };

    return res.status(201).json({
      message: "Usuario registrado con éxito",
      user: newUser,
    });
  }

  return res.status(405).json({ error: "Método no permitido" });
}
