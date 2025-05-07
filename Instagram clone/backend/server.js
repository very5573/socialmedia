const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const config = require('./loc.json');

const app = express();
app.use(cors());
app.use(express.json());

// Static file serving using loc.json config
app.use(`/${config.staticUrl}`, express.static(path.join(__dirname, config.staticUrl)));

// Storage config using loc.json config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isVideo = file.mimetype.startsWith('video');
    const dir = isVideo ? config.videoUploadPath : config.imageUploadPath;
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 * 1024 }, // 3GB
});

// Upload video
app.post('/upload/video', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({
    path: `/${config.staticUrl}/videos/${req.file.filename}`,
    filename: req.file.filename,
    type: 'video',
  });
});

// Upload image
app.post('/upload/image', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({
    path: `/${config.staticUrl}/images/${req.file.filename}`,
    filename: req.file.filename,
    type: 'image',
  });
});

// Fetch all media
app.get('/media', (req, res) => {
  const getFiles = (dir, type) =>
    fs.existsSync(dir)
      ? fs.readdirSync(dir).map(file => ({
          path: `/${config.staticUrl}/${type}s/${file}`,
          filename: file,
          type,
        }))
      : [];

  const images = getFiles(config.imageUploadPath, 'image');
  const videos = getFiles(config.videoUploadPath, 'video');
  res.json([...images, ...videos]);
});

// Delete media
app.delete('/media/:type/:filename', (req, res) => {
  const { type, filename } = req.params;
  const dirPath = type === 'video' ? config.videoUploadPath : config.imageUploadPath;
  const filePath = path.join(__dirname, dirPath, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'File not found!' });
  }

  fs.unlinkSync(filePath);
  res.json({ message: 'File deleted successfully' });
});

// Start server
app.listen(config.serverPort, () => {
  console.log(`🚀 Server running at http://localhost:${config.serverPort}`);
});
