import  Express  from 'express';
import dotenv from 'dotenv';
import './models/db.js';
import router from './routes/user_routes.js';
import carRouter from './routes/car_routes.js';
import { compareRouter01, compareRouter02} from './routes/compare_routes.js'
import searchRouter from './routes/search_routes.js';
import productRouter from './routes/products_routes.js';
import authRouter from './routes/auth.js';
import cartRouter from './routes/cart_routes.js';

dotenv.config();
const app = Express();
app.use(Express.json());
app.use(router);
app.use(carRouter);
app.use(searchRouter);
app.use(compareRouter01);
app.use(compareRouter02);
app.use("/products",productRouter);
app.use(authRouter);
app.use("/carts",cartRouter);
app.get('/', (req, res) => {
    res.json({success: true, message: 'backend zone '});
})


// 30105    Server PID no.
// 31013
const port= process.env.PORT ||  20003;
// 34446
app.listen(port, () => {
    console.log(`Olengines server at port: ${port}`); 
}) 
