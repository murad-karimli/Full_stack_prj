import express from 'express';
import jwt from 'jsonwebtoken';

const Refreshrouter = express.Router();

Refreshrouter.post('/token/refresh', async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Refresh token is required.' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err:any, decoded:any) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Invalid refresh token.' });
      }

      const accessToken = jwt.sign(
        { email: decoded.email, id: decoded.id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );

      res.status(200).json({ success: true, access_token: accessToken });
    });
  } catch (err) {
    console.error('Error in refresh token endpoint:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

export default Refreshrouter;
