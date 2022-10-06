import {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} from './verifyToken_routes.js';
import express from 'express';
import Products from '../models/products.js';

const productRouter = express.Router();

// all products

productRouter.get('/', async (req, res) => {
    const qNew = req.query.new;
    let products;
    try { 
        if(qNew){
            products = await Products.find().sort({createdAt: -1}).limit(5)
        }else{
            products = await Products.find();
        }
        res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error)
    }
})

productRouter.get('/product_item/', async (req, res) => {
    const product = await Products.find({item_name : req.query.q});
    console.log(product);
    return res.json({success:product});
})

productRouter.get('/product_cart/', async (req, res) => {
    const product_cart = await Products.find({_id : req.query.q});
    console.log(product_cart);
    return res.json({success:product_cart});
})

productRouter.post('/newProduct', verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Products(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
        console.log(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
}) 


// update product detail 

productRouter.put('/update/:id', verifyTokenAndAdmin, async (req, res) => {
    
    try {
        const updateProduct = await Products.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json(error) 
    }
});

//delete product

productRouter.delete('/delete/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id);
        res.status(200).json('Product has been deleted...')
    } catch (error) {
        return res.status(500).json(error)
    } 
})

//find product

productRouter.get('product/find/:id', async (req, res) => {
    try { 
        const product = await Products.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error)
    }
})

export default productRouter;