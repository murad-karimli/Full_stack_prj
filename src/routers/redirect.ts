// Import necessary modules
import express, { Request, Response } from 'express';
import Url from '../models/url'; 
const redirectRouter = express.Router();


redirectRouter.get('/:shortcode', async (req: Request, res: Response) => {
    try {
        const { shortcode } = req.params;

        const url = await Url.findOne({ shortcode });

        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({ error: 'Shortened URL not found' });
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default redirectRouter;
