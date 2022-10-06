import mongoose  from "mongoose";

const compareSchema = new mongoose.Schema({
    car_company:{
        type: 'string'
    },
    car_name:{
        type: 'string'
    },
    car_engine:{
        type: 'string'
    },
    car_fueltype:{
        type: 'string'
    },
    car_price:{
        type: 'string'
    },
    car_seatingCapacity:{
        type: 'string'
    },
    car_transmission:{
        type: 'string'
    },
    car_vehicleType:{
        type: 'string'
    },
    car_image:{
        type: 'string'
    }
})

const compareModel = mongoose.model('Cars_infos', compareSchema);
export default compareModel;