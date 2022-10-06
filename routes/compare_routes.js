import express from 'express';
import Cars_infos from '../models/car.js';

export const compareRouter01 = express.Router();
export const compareRouter02 = express.Router();

compareRouter01.get('/compare01', async (req, res) => {
    console.log(req.query.q);
    const compare_car01 = await Cars_infos.find({car_name : req.query.q});
    console.log(compare_car01);
    return res.json({success: compare_car01});
})

compareRouter02.get('/compare02', async (req, res) => {
    console.log(req.query.q);
    const compare_car02 = await Cars_infos.find({car_name : req.query.q});
    console.log(compare_car02);
    return res.json({success: compare_car02});
})

