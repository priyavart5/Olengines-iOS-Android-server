import express from "express";
import Cars_info from '../models/car.js';

const carRouter = express.Router();

carRouter.get('/car', async (req, res) => {
    console.log(req.query.q)
    const car = await Cars_info.find({car_name : req.query.q});
    console.log(car);
    return res.json({success:car});
})

carRouter.get('/company', async (req, res) => {
    console.log(req.query.q)
    const company = await Cars_info.find({car_company : req.query.q});
    console.log(company);
    return res.json({success:company});
})

export default carRouter;