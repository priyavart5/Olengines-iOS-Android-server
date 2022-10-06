import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    confirmPassword:{
        type: String,
        required: true
    },
    address:{
        type: String,
    },
    state:{
        type: String
    },
    county:{
        type: String
    },
    pinCode:{
        type: Number
    },
    phoneNumber:{
        type: Number
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    cart_item:[String],
    accessToken:[
        String,
    ]
},{timestamps: true})

userSchema.pre('save', function (next) {
    if(this.isModified('password')){
        bcrypt.hash(this.password, 8,(err,hash)=>{
            if(err) return next(err);

            this.password = hash;
            next();
        })
    }
})

userSchema.methods.comparePassword= async function(password){
    if(!password) throw new Error('Password is missing, can not compare!');
    try{
        const result = await bcrypt.compare(password, this.password)
        return result;
    }catch(error){
        console.log('ErrorWhile comparing password!', error.message)
    }
}

userSchema.statics.isThisEmailInUse = async function(email) {
    if(!email) throw new Error('Invalid Email')
    try {
        const user = await this.findOne({ email});
        if(user) return false
        return true;
    }catch(error) {
        console.log('error inside isThisEmailInUse method', error.message);
        return false;
    }
}

var userModel = mongoose.model('User', userSchema);
export default userModel;