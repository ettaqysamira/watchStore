import Watch from "../models/watch.js";
import mongoose from 'mongoose';


export const getWatches = async (req, res) => {
  try {
    const watches = await Watch.find();

    const now = new Date();

    const updatedWatches = watches.map((watch) => {
      const createdAt = new Date(watch.createdAt);
      const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24);
      return {
        ...watch.toObject(),
        hasNew: diffInDays < 7, 
      };
    });

    res.json(updatedWatches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const createWatch = async (req, res) => {
  try {
    const currentDate = new Date();

    const newWatchData = {
      ...req.body,
      hasNew: true, 
      createdAt: currentDate,
    };

    const newWatch = new Watch(newWatchData);
    await newWatch.save();

    res.status(201).json(newWatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



export const getWatchById = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID invalide" });
  }
  
  try {
    const product = await Watch.findById(id);
    if (!product) return res.status(404).json({ message: "Produit non trouvé" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getSimilarWatches = async (req, res) => {
  const { brand, price, excludeId } = req.query;
  const targetPrice = parseFloat(price);

  try {
    const similarWatches = await Watch.find({
      _id: { $ne: excludeId },
      $or: [
        { brand: brand },
        {
          price: {
            $gte: targetPrice - 200,
            $lte: targetPrice + 200,
          },
        },
      ],
    }).limit(3);

    res.status(200).json(similarWatches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



