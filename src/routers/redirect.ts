// Import necessary modules
import express, { Request, Response } from 'express';
import findAndRedirect from '../services/redirectUrl';

const redirectRouter = express.Router();


redirectRouter.get('/:shortcode', async (req: Request, res: Response) => {
    try {
      const url=await findAndRedirect(req.params.shortcode)
      res.redirect(url)
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default redirectRouter;
