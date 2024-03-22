import { authUser } from "../controllers/login";
import express from "express";
const loginRouter = express.Router();

loginRouter.post(
  "/auth/login",
  async (req: express.Request, res: express.Response) => {
    authUser(req, res);
  }
);
export default loginRouter;
