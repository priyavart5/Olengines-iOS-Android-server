import {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} from './verifyToken_routes.js';
import express from 'express';
import Carts from '../models/cart.js';
import User from '../models/user.js';
const cartRouter = express.Router();

//Create cart

cartRouter.post('/', verifyToken, async (req, res) => {
    const newCart = new Carts(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
        console.log(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
}) 

cartRouter.post('/quantity')


// update cart detail 

cartRouter.put('/update/:id', verifyTokenAndAuth , async (req, res) => {
    
    try {
        const updateCart = await Carts.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});
        res.status(200).json(updateCart);
    } catch (error) {
        res.status(500).json(error) 
    }
});

//delete cart

cartRouter.delete('/orderDelete/:id', verifyTokenAndAuth, async (req, res) => {
    try {
        await Carts.findByIdAndDelete(req.params.id);
        res.status(200).json('Cart has been deleted...')
    } catch (error) {
        return res.status(500).json(error)
    } 
})

//find user cart

cartRouter.get('/find/:userId',verifyTokenAndAuth, async (req, res) => {
    try { 
        const cart = await Carts.findOne({userId : req.params.userId});
        res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json(error)
    }
})

// cart all products 

cartRouter.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Carts.find();
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
})

//remove item from cart
cartRouter.get('/remove/item', async (req, res) => {
    //console.log(req.query.item_id)
    //console.log(req.query.user_id)
    const user = await User.findOne({_id : String(req.query.user_id)})
    const arr = user.cart_item.filter(item => item!==req.query.item_id)
    //console.log("new array",arr)
    //splice
    let pos 
    // for(let i = 0; i < user.cart_item.length ; i++){
    //     if(user.cart_item[i] == req.query.item_id){
    //         pos = i
            
    //         break
    //     }
    // }
    // user.cart_item.splice(pos,pos)
    // console.log('item',user.cart_item)
    // user.cart_item.splice(0,user.cart_item.length )
    
    // console.log('all cleaned',user.cart_item)
    
    // await user.save()
    //console.log(updated)
    //splice
    User.updateOne({_id : String(req.query.user_id)},{ $set : { cart_item : arr}},(err)=>{
        if(err){
            console.log(err)
        }else{
            return res.json({success: true})
        }
    })
    //return res.json({success: true})
})

export default cartRouter;