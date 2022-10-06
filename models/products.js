import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    item_company:{
        type: String,
        required: true
    },
    item_name:{
        type: String,
        required: true
    },
    item_price:{
        type: String,
        required: true
    },
    item_image:{
        type: String,
        required: true
    },
    item_description:{
        type: String,
        required: true
    },
    item_inStock:{
        type: Boolean,
        default: true
    }
}, {timestamps:true})

const shopItemModel = mongoose.model('Products', productsSchema);
export default shopItemModel;