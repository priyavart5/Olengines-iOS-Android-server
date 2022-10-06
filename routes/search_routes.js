import express from "express";
import Cars_infos from '../models/car.js';
import Products from '../models/products.js';

const searchRouter = express.Router();

searchRouter.get('/search', async (req, res) => {
    console.log(req.query.q);
    const search_car = await Cars_infos.find({car_name : req.query.q });
    console.log(search_car);
    return res.json({success: search_car});
});


searchRouter.get('/searchProduct', async (req, res) => {
    console.log(req.query.q);
    const searchProduct = await Products.find({item_name : req.query.q });
    console.log(searchProduct);
    return res.json({success: searchProduct});
});



export default searchRouter;