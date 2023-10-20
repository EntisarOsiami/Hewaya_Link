import { uploader } from './cloudinaryConfig.js'; 
import multer, { memoryStorage } from 'multer';

const storage = memoryStorage(); 
const upload = multer({ storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const result = await uploader.upload(req.file.buffer, {
      folder: `${User}_gallery_folder`, 
    });

    const newImage = new ImageGallery({
      user: req.user._id, 
      imageName: req.file.originalname,
      imageUrl: result.secure_url,
      description: req.body.description,
    });

    await newImage.save();

    return res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
