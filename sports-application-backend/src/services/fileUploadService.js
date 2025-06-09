import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sports-app/users',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

// Configure multer upload
const upload = multer({ storage: storage });

export const uploadToCloudinary = async (file) => {
  try {

    const result = await cloudinary.uploader.upload(file, {
      folder: 'sports-app/users',
      transformation: [{ width: 500, height: 500, crop: 'limit' }]
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Failed to upload file to Cloudinary');
  }
};

export { upload }; 