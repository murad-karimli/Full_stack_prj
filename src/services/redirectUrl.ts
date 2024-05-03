import Url from '../models/url'; 
import { ShortenerError, ShortenerErrors } from '../helpers/errors';

async function findAndRedirect(shortcode: string): Promise<string> {
    try {
        const url = await Url.findOne({ shortcode });
        
        if (url) {
            return url.originalUrl;
        } else {
            throw new ShortenerError({
                name: ShortenerErrors.NotFound,
                message: "Your short URL was not found",
                statusCode: 404, 
            });
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

export default findAndRedirect