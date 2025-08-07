import express from 'express'; 
import { getWatches, createWatch, getWatchById } from '../controllers/watchController.js';
import { getSimilarWatches } from '../controllers/watchController.js';

const router = express.Router();

router.get('/similar',getSimilarWatches);
router.get('/', getWatches);
router.post('/', createWatch);
router.get("/:id", getWatchById);




export default router;