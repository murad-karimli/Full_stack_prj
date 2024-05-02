import express, { Request, Response } from 'express';
import Url  from '../models/url'; 

const allUrlRouter = express.Router();

allUrlRouter.get('/allUrl',async(req:any,res:any)=>{

    try {
        const urls = await Url.find();

        res.json(urls);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default allUrlRouter;