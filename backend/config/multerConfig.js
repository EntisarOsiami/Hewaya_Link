import multer from 'multer';

const fileFilter = (req, file, cb) => {
    const isImage = file.mimetype.startsWith('image/');
    cb(isImage ? null : new Error('Not an image! Please upload only images.'), isImage);
};
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

export default upload;
