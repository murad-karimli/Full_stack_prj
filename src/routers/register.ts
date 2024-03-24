import express from "express";
import { register } from "../controllers/register";
const router = express.Router();

router.post("/auth/register", async (req, res, next) => {
  try {
    register(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
