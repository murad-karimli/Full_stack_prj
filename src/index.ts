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
import { errorHandler } from "./middlewares/errorMiddleware";
import { logAsync } from "./controllers/logger";
import Refreshrouter from "./routers/refreshToken";
import urlRouter from "./routers/urlShortener";
import allUrlRouter from "./routers/allUrls";
import redirectRouter from "./routers/redirect";

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

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/v1", router);
app.use("/api/v1", loginRouter);
app.use("/api/v1",Refreshrouter);
app.use("/api/v1",urlRouter)
app.use("/api/v1",allUrlRouter)
app.use("/api/v1",redirectRouter)

app.use(async(req, res, next) => {
  await logAsync("info", `Request URL: ${req.originalUrl}`);
  next();
});

app.get("/", async (req, res) => {
  await logAsync("info","Request sent: SALAM QAQA");
  res.send({ message: "SALAM QAQA" }).status(200);
});

app.get("/api/v1/users", async (req, res, next) => {
  try {
    await logAsync("info","User list requested");
    const user = await getUsers();
    res.status(200).send(user);
  } catch (err) {
    await logAsync("error","error happened to fetch users")
    next(err);
  }
});

app.use(errorHandler);

const server = http.createServer(app);

server.listen(5000, () => {
  console.log("Server is running on http://localhost:5000/");
});
