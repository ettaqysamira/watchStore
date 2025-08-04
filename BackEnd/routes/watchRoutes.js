import express from 'express'; 
import { getWatches, createWatch } from '../controllers/watchController.js';

const router = express.Router();

router.get('/', getWatches);
router.post('/', createWatch);

export default router;