/* eslint-disable no-underscore-dangle */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path'
import  config  from './config';
import UserRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';
import uploadRouter from './routers/uploadRouter';


mongoose.connect(config.MONGODB_URL, {
})
.then(()=>{
  console.log('Connected to mongodb.');
})
.catch((error)=>{
  console.log(error.reason);
})

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use('/api/uploads', uploadRouter);
app.use('/api/users', UserRouter);
app.use('/api/orders', orderRouter)
app.use('/api/products', productRouter)
app.get('/api/paystack/clientId',(req,res)=>{
  res.send({clientId: config.PAYSTACK_CLIENT_ID})
})
app.get('/api/paypal/clientId',(req,res)=>{
  res.send({clientId: config.PAYPAL_CLIENT_ID})
})
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')))
app.use(express.static(path.join(__dirname, '/../frontend')))
app.use('*',(req,res)=>{
  res.sendFile(path.join(__dirname, '/../frontend/index.html'))
})

app.use((err, req, res, next)=>{
  const status = err.name && err.name === 'ValidationError'? 400:500;
  res.status(status).send({message: err.message})
})

app.listen(config.PORT, () => {
  console.log('Serve at http://localhost:5000');
});
