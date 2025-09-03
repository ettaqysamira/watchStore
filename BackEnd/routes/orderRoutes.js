import express from 'express';
import {createOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder, getOrderStats} from '../controllers/orderController.js';
import HomePageApp from '../../watch-store/src/pages/homePage/App.jsx';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);
router.get("/stats", getOrderStats);


export default router;
