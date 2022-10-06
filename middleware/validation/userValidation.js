import {check, validationResult} from 'express-validator';

export const validateUserSignup = [
    check('firstName').trim().not().isEmpty().withMessage('Name is required').isString().withMessage('Must be a valid name').isLength({min:3, max:20}).withMessage('Name must be within 3 to 20 characters!'),
    check('email').normalizeEmail().isEmail().withMessage('Email is required').withMessage('Invalid email!'),
    check('password').trim().not().isEmpty().withMessage('Password is empty!').isLength({min:8, max:20}).withMessage('Password must be within 8 to 20 characters long!'),
    check('confirmPassword').trim().not().isEmpty().custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Confirm password must be same as password');
        }
        return true;
    })
]

export const userValidation = (req,res,next) => {
    const result = validationResult(req).array();
    console.log(result); 
    if(!result.length) return next();
    const error  =result[0].msg;
    res.json({success: false, message: error});
}

export const validateUserSignin = [
    check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Email is required')
        .withMessage('Invalid email!'),
    check('password')
        .trim()
        .not()
        .isEmpty().withMessage('Password is empty!')
        .isLength({min:8, max:20}).withMessage('Password must be within 8 to 20 characters long!'),
]