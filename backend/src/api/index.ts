import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import bodyParser from "body-parser";

import loginRoutes from "../routes/login";
import registerRoutes from "../routes/register";
import historyRoutes from "../routes/history";
import usersRoutes from "../routes/users";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/users", usersRoutes);

export const handler = serverless(app);
