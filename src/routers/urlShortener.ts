import express, { Request, Response } from 'express';
import Url  from '../models/url'; // Import the Url model
import { verifyAccessToken } from '../helpers/verifyToken';

const urlRouter = express.Router();

const baseUrl = 'http://localhost:3456';


urlRouter.post('/shortenUrl', async (req: Request, res: Response) => {
  try {
    const { originalUrl } = req.body;

    const accessToken = req.headers.authorization?.split(' ')[1];
    
    if (!accessToken) {
      return res.status(401).json({ error: 'Access token is missing.' });
    }
    await verifyAccessToken(accessToken)

    const existingUrl = await Url.findOne({ originalUrl });

    if (existingUrl) {
      return res.json({ 
        shortUrl: `${baseUrl}/${existingUrl.shortcode}`,
        originalUrl: existingUrl.originalUrl
      });
    } else {
      const newUrl = new Url({ originalUrl });
      await newUrl.save();
      return res.status(201).json({ 
        shortUrl: `${baseUrl}/${newUrl.shortcode}`,
        originalUrl: newUrl.originalUrl
      });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error occurred:', error);
    return res.status(500).json(error);
  }
});

export default urlRouter;
