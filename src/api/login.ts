import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Usuario y contraseña son requeridos" });
    }

    const user = { id: 1, username };

    return res.status(200).json({
      message: "Login exitoso",
      user,
    });
  }

  return res.status(405).json({ error: "Método no permitido" });
}
