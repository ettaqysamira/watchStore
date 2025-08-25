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
  orderDate:   { type: Date, default: Date.now },
   orderNumber: { type: String, unique: true },


}, { timestamps: true });


orderSchema.pre("save", async function (next) {
  if (this.isNew && !this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    const count = await mongoose.model("Order").countDocuments({
      orderDate: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(`${year}-${month}-31`),
      }
    });

    const sequence = String(count + 1).padStart(4, "0"); 
    this.orderNumber = `ByDox${year}${month}${sequence}`; 
  }
  next();
});


const Order = mongoose.model('Order', orderSchema);
export default Order;
