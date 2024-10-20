const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        // Replace spaces with underscores or remove them
        const sanitizedFilename = file.originalname.replace(/\s+/g, '_');
        cb(null, `${Date.now()}-${sanitizedFilename}`);
    },
});

// Check file type
const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};

// Initialize upload
const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

module.exports = upload;
