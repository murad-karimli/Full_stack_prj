import { authUser } from "../controllers/login";
import express from "express";
const loginRouter = express.Router();

loginRouter.post("/auth/login",async (req, res, next) => {
    try{
      authUser(req, res);
    }catch(err){
      next(err)
    }
  }
);
export default loginRouter;
