import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_KEY_SECRET, 
});

// Export the configured instance
export default cloudinary;
