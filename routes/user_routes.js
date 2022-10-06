import express from "express";
import {userSignup, userSignin, cart_item, userAddress} from '../controllers/user_controllers.js';
import {validateUserSignup, userValidation, validateUserSignin} from "../middleware/validation/userValidation.js";
import User from '../models/user.js';
import Products from '../models/products.js';

const router = express.Router();

router.post('/signup', validateUserSignup,userValidation, userSignup);
router.post('/signin',validateUserSignin,userValidation, userSignin);
router.post('/cart_item', cart_item);
router.post('/userAddress', userAddress);
router.get('/user', async (req, res) => {
    const user = await User.findOne({_id : String(req.query.q)})
    var data = [ ]
    if(user.cart_item.length == 0){
        return res.json({success:data});
    }else{
        for (let i = 0; i < user.cart_item.length; i++) {
            const item = await Products.findOne({ _id : user.cart_item[i]})
            data.push(item)
        }
        return res.json({success:data});
    }
    
})

router.get('/cart_len', async (req, res) => {
    const item = await User.findOne({user_id : req.body.user_id})
    return res.json({success: item.cart_item.length})
})

export default router;