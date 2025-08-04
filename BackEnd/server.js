import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import watchRoutes from './routes/watchRoutes.js';
import multer from 'multer';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'restoreImages/');
  },
  filename: function (req, file, cb) {
    cb(null, 'watch-' + Date.now() + path.extname(file.originalname)); 
  }
});
const watchImage = multer({ storage: storage });

app.use('/restoreImages', express.static(path.join(process.cwd(), 'restoreImages')));

app.post('/api/watchImage', watchImage.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier téléchargé' });
  }
  res.json({
    message: 'Fichier téléchargé avec succès',
    filename: req.file.filename,
    path: req.file.path
  });
})









app.use('/api/watches', watchRoutes);
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error('MongoDB connection error:', err));
