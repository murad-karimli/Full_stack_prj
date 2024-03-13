import express from "express";
import { register } from "../controllers/auth";
const router=express.Router()

router.post('/auth/register', async (req, res) => {
    register(req,res)
});

export default router;