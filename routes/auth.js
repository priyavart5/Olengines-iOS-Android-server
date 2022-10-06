import {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} from './verifyToken_routes.js';
import express from 'express';
import User from '../models/user.js'

const authRouter = express.Router();

authRouter.put('/:id', verifyTokenAndAuth, async (req, res) => {
    if(req.body.password){
        const isMatch = await User.comparePassword(password);
        if(!isMatch) return res.json({success: false, message: 'Password does not match'})
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json(error) 
    }
});

//delete user

authRouter.delete('/:id', verifyTokenAndAuth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...')
    } catch (error) {
        return res.status(500).json(error)
    } 
})

//find user or all users

authRouter.get('/allUsers', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try { 
        const user = query ? await User.find().sort({_id : -1}).limit(1 ) : await User.find();
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
})

//user stats

authRouter.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    const data = new Date();
    const lastYear = new Date(data.setFullYear(data.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {
                $project:{
                    month: {$month: "$createdAt"}
                }
            },
            {
                $group:{
                    _id: '$month',
                    total: {$sum : 1}
                }
            }
        ]);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error)
    }
})

export default authRouter;