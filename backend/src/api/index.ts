import dotenv from "dotenv";
import express from "express";
import { sql } from "@vercel/postgres";
import bodyParser from "body-parser";
// import path from "path";

dotenv.config();
const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "../../../", "frontend/Home/", "home.tsx"));
// });

// app.get("/home", function (req, res) {
//   res.sendFile(path.join(__dirname, "..", "components", "home.htm"));
// });

// app.get("/uploadUser", function (req, res) {
//   res.sendFile(
//     path.join(__dirname, "..", "components", "user_upload_form.htm")
//   );
// });

// app.post("/uploadSuccessful", urlencodedParser, async (req, res) => {
//   try {
//     await sql`INSERT INTO Users (Id, Name, Email) VALUES (${req.body.user_id}, ${req.body.name}, ${req.body.email});`;
//     res.status(200).send("<h1>User added successfully</h1>");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error adding user");
//   }
// });

app.get("/api/users", async (req, res) => {
  try {
    const users = await sql`SELECT * FROM Users`;
    console.log(users.rows);
    res.status(200).json(users.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving users" });
  }
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
