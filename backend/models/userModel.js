import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
    },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: { 
    type: String, 
    required: true 
  },
  isAdmin: { 
    type: Boolean, 
    required: true, 
    default: false 
  },
  access: { 
    type: Boolean, 
    required: true, 
    default: true 
  },
    firstName: { type: String},
    lastName: { type: String },
    phone: { type: String },
    deliveryAddress: { type: String },
    additional: { type: String },
    town: { type: String},
    state: { type: String },
    company: { type: String },
    country: { type: String},
  

});

const User = mongoose.model('User', userSchema);
export default User;
