import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


const orderSchema = new mongoose.Schema({
  customer: {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    phone:     { type: String, required: true },
    email:     { type: String, required: true },
    address:   { type: String, required: true },
    city:      { type: String, required: true },
    deliveryOption: { type: String, default: 'standard' },
    saveInfo:  { type: Boolean, default: false },
    newsletter:{ type: Boolean, default: false }
  },

  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Watch', required: true },
      name: String,            
      price: Number,           
      quantity: { type: Number, required: true },
      image: String           
    }
  ],

  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered'], 
    default: 'pending' 
  },

  paymentMethod: { type: String, default: 'cash-on-delivery' },
  orderDate:   { type: Date, default: Date.now },
   orderNumber: { type: String, unique: true },


}, { timestamps: true });


orderSchema.pre('save', function(next) {
  if (this.isNew && !this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    const shortUuid = uuidv4().split('-')[0]; 
    this.orderNumber = `ByDox${year}${month}${shortUuid}`;
  }
  next();
});


const Order = mongoose.model('Order', orderSchema);
export default Order;
