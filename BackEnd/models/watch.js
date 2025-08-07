import mongoose from 'mongoose';

function arrayLimit(val) {
  return val.length <= 4;
}

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
  imageGallery: [String],
  features: {
    type: [String],
    default: [],
    validate: [arrayLimit, '{PATH} exceeds the limit of 4']
  },
}, { timestamps: true });

const Watch = mongoose.model('Watch', watchSchema);
export default Watch;
