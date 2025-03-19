// import { upload } from "@testing-library/user-event/dist/upload"; 

const cloudinaryConfig = {
  cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
  apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
};

  
  export default cloudinaryConfig;