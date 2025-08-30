import Order from "../models/order.js";
import mongoose from 'mongoose';

export const createOrder = async (req, res) => {
  try {
    const { customer, items, totalAmount } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ message: "Informations de commande invalides" });
    }

    const newOrder = new Order({ customer, items, totalAmount });
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.json(order);
  } catch (err) {
    console.error("Erreur update:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.json({ message: "Commande supprimée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getOrderStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const total = stats.reduce((acc, s) => acc + s.count, 0);

    res.json({
      total,
       processing: stats.find((s) => s._id === "processing")?.count || 0,
        shipped: stats.find((s) => s._id === "shipped")?.count || 0,
        delivered: stats.find((s) => s._id === "delivered")?.count || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
