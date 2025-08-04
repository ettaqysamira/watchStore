import Watch from "../models/watch.js";

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

