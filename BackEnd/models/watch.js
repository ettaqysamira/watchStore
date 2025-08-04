import mongoose from 'mongoose';


const watchSchema = new mongoose.Schema({
 id: Number,
  name:String,
  category: String,
  brand: String,
  model: String,
  price: String,
  description:[String],
  sku:String,
  currentStock:Number,
  originalPrice: String,
  image: String,
  hasNew: Boolean,
  isExclusive: Boolean,
  isLimited: Boolean,
  isPopular: Boolean,
  isIconic: Boolean,
  discount: Number,
  inStock: Boolean,   
}, { timestamps: true });

const Watch = mongoose.model('Watch', watchSchema);
export default Watch;
