import mongoose from 'mongoose';

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
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },

  paymentMethod: { type: String, default: 'cash-on-delivery' },

}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
