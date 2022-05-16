const {body, validationResult} = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

require("dotenv").config();

const createToken = (user)=>{
    return jwt.sign({user}, process.env.SECRET,{
        expiresIn: '7d'
    });
}

module.exports.registerValidations = [
    body("name").not().isEmpty().trim().withMessage("Name is required"),
    body("username").not().isEmpty().trim().withMessage("Userame is required"),
    body("email").not().isEmpty().trim().withMessage("Email is required"),
    body("password").isLength({min: 6}).withMessage("Password must be 6 characters long")
];

// /register API
module.exports.register = async (req, res)=>{
    const {name, username, email, password} = req.body;


    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(404).json({errors: errors.array()})
    }

    try{
        const checkUser = await User.findOne({email})
        const checkUsername = await User.findOne({username})

        if(checkUser){
            return res.status(400).json({errors: [{msg:  "Email is already taken"}]})
        }
        if(checkUsername){
            return res.status(400).json({errors: [{msg:  "Username is already taken"}]})
        }
        //Password Hash
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        try{

            const user = await User.create({
                name,
                username,
                email,
                password: hash,
            });
            
            const token = createToken(user);

            return res.status(200).json({msg: "Your account has been created", token});
        
        }catch (error){
            return res.status(500).json({errors: error});
        }
        

    }catch (error){
        return res.status(500).json({errors: error});
    }


}

module.exports.loginValidations = [
    body("username").not().isEmpty().trim().withMessage("Email is required"),
    body("password").not().isEmpty().withMessage("Password is required")
];

// /login API
module.exports.login = async (req, res)=>{


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({errors: errors.array()})
    }
    const {username, password} = req.body;

    try{

        const user = await User.findOne({username})
        if(user){

            const matched = await bcrypt.compare(password, user.password);
            if(matched){

                const token = createToken(user);

                return res.status(200).json({msg: "You have login successfully", token});

            }else{
                return res.status(401).json({errors: [{msg: "Entered password is incorrect"}]});
            }

        }else{
            return res.status(404).json({errors: [{msg: "Username not found"}]});
        }

    }catch (error){
        return res.status(404).json({errors: error})
    }

}