import Order from "../models/order.js";

export const createOrder = async (req, res) => {
  try {
    const { customer, items, totalAmount } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ message: "Informations de commande invalides" });
    }

    const newOrder = new Order({
      customer,
      items,
      totalAmount
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
