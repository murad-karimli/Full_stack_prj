import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "../src/routers/register";
import loginRouter from "./routers/login";
import mongoose from "mongoose";
import { getUsers } from "../src/models/users";

const app = express();
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://mongo_db:27017/my_db", {})
  .then(() => {
    console.log("successfully connected to the database");
  })
  .catch((err) => {
    console.log("error connecting to the database", err);
    process.exit();
  });

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/v1", router);
app.use("/api/v1", loginRouter);

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080/");
});

app.get("/", async (req, res) => {
  res.send({ message: "SALAM QAQA" }).status(200);
});
app.get("/api/v1/users", async (req, res) => {
  const user = await getUsers();
  console.log(user);
  res.send(user);
});
