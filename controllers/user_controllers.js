import User from  '../models/user.js';
import jwt from 'jsonwebtoken';

export const userSignup = async (req, res) =>{
    const { firstName, lastName, email, password, confirmPassword, address, state, country, pinCode, phoneNumber} = req.body;
    const isNewUser = await User.isThisEmailInUse(email);
    if(!isNewUser)
    return res.json({
        success: false,
        message: 'This Email is already in use, try sign-in'
    })
    const user = await User({firstName, lastName, email, password, confirmPassword, address, state, country, pinCode, phoneNumber})
    await user.save()
    res.json(user);
    console.log(user);
}

export const userSignin = async (req,res) =>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email:email})
        if(!user) return res.json({success: false, message: 'User not found using this email'})
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.json({success: false, message: 'Password does not match'})
        const accessToken = jwt.sign(
            {
                id: user._id,
                accessToken: user.accessToken,
                // isAdmin: user.isAdmin
            }, process.env.JWT_SECRET, {expiresIn: '1d' }
        );
        let values = { $push :{accessToken : [accessToken]} }
        User.updateOne({email:email},values,(err)=>{
            if(err){ 
                console.log(err)
            }else{
                console.log("Acced token saved")
            }
        })
        console.log(user);
        res.status(200).json({success: accessToken, user:user})
        
    } catch (error) {
        res.status(401).json("Unauthorized User")
        console.log(error)
    }
}

export const userAddress = async (req, res) =>{
    const user = await User.findOne({email: String(req.query.q)})
    console.log(user)
    User.updateMany({$push:{address : req.body.address, 
                            state : req.body.state, 
                            country: req.body.country,
                            pinCode : req.body.pinCode,
                            phoneNumber : req.body.phoneNumber
        }},(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("user Data Saved")
            return res.json({success: true})
        }
    })
}

export const cart_item = async (req, res) =>{
    const user = await User.findOne({_id: String(req.query.q)})
    User.updateOne({_id:req.query.q}, {$push : {cart_item : [req.body.itemid]}},(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("item added tomcart")
            return res.json({success: true})
        }
    })
}

