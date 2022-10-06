import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
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
    car_img:{
        type: 'string'
    }
})



const carModel = mongoose.model('Cars_infos', carSchema);
export default carModel;