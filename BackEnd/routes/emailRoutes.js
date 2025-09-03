import express from "express";
import { sendOrderEmail } from "../controllers/emailControllers.js";

const router = express.Router();

router.post("/order", sendOrderEmail);

export default router;
