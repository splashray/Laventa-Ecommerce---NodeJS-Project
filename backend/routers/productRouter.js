import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../utils';
import Product from '../models/productModel';

const productRouter = express.Router();

productRouter.get('/all', expressAsyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.send(products);
})
)  

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const searchKeyword = req.query.searchKeyword
      ? {
          name: {
            $regex: req.query.searchKeyword,
            $options: 'i',
          },
        }
      : {};
    const products = await Product.find({ ...searchKeyword });
    res.send(products);
  })
);

productRouter.get(
  '/home',
  expressAsyncHandler(async (req, res) => {

    // const products = await Product.find({}).limit(3);
    // res.send(products);
    // db.products.aggregate([{$sample: {size: 10}}]);
    // .skip(yourRandomNumber).next()
    // .sort({random: 1}).limit(1)[0]
    // Product.find().limit(6).skip(Math.floor(Math.random() * 3)).then(products=>{

    Product.aggregate([ { $sample: { size: 6 } } ]).then(products=>{
      if(!products){
          const error=new Error("No Product is there to fetch");
          error.statusCode=404;
          throw(error);
      }
      return res.status(200).send(products);
    }).catch(err=>console.log(err));

   


  })

);





productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
  })
);

productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'sample product',
      desc: 'sample description',
      category: 'sample category',
      brand: 'sample brand',
      image: '/img/product-1.jpg',
    });
    const createdProduct = await product.save();
    if (createdProduct) {
      res
        .status(201)
        .send({ message: 'Product Created', product: createdProduct });
    } else {
      res.status(500).send({ message: 'Error in creating product' });
    }
  })
);

productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.desc = req.body.desc;
      product.tags = req.body.tags;

      const updatedProduct = await product.save();
      if (updatedProduct) {
        res.send({ message: 'Product Updated', product: updatedProduct });
      } else {
        res.status(500).send({ message: 'Error in updating product' });
      }
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deletedProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deletedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const review = {
        rating: req.body.rating,
        comment: req.body.comment,
        user: req.user._id,
        name: req.user.name,
      };
      product.reviews.push(review);
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      product.numReviews = product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Comment Created.',
        data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      throw Error('Product does not exist.');
    }
  })
);

export default productRouter;
