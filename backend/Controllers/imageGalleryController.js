import ImageGallery from '../models/imageGallery/imageGallerySchema.js';

export async function uploadImage(req, res) {
  try {
    const { user, imageName, imageUrl, description } = req.body;
    const newImage = new ImageGallery({ user, imageName, imageUrl, description });
    await newImage.save();

    return res.status(201).json({ message: 'Image uploaded successfully', data: newImage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getAllImages(req, res) {
  try {
    const images = await find();
    return res.status(200).json({ data: images });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteImage (req, res)  {
    try {
      const { id } = req.params;
  
      const image = await ImageGallery.findById(id);
      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      await ImageGallery.findByIdAndRemove(id);
  
      return res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

