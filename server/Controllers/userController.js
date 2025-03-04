const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken =(_id) =>{
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtkey, {expiresIn:"3d"});
};

const registerUser= async(req,res) =>{
    try{
    const {name, email,password} = req.body;

    let user = await userModel.findOne({ email });

    if(user) 
        return res.status(400).json("user with the given email already exists");
    
    if(!name || !email || !password) 
        return res.status(400).json("all fields are required");

    if (!validator.isEmail(email)) 
        return res.status(400).json("email must be valid");

    if (!validator.isStrongPassword(password)) 
        return res.status(400).json("password must be strong");

    user = new userModel({name,email,password})

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save();

    const token = createToken(user._id);

    res.status(200).json({_id: user._id, name, email, token})
}catch(error){
    console.log(error);
    res.status(500).json(error);
    // here the above hings we test using the postman if the parameters are reflectiong the db or not 
    // here we use do the crude operations like 
    // http://localhost:5000/api/users/register
    // when we give the details we must see the bodyoutput in the postman :
    // which we see the op like user name, email, password.
}
}

const loginUser =async(req, res) =>{
    const {email, password} = req.body;
    try{
        let user = await userModel.findOne({email});

        if(!user)return res.status(400).json("Invalid email or password")

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword) return res.status(500).json("invalid password");

    const token = createToken(user._id);
    res.status(200).json({_id:user._id, name:user.name, email, token});

    }
    catch(error){
        console.log(error)
        res.status(500).json(error)

    }
};

const findUser = async(req,res)=>{
    const userId = req.params.userId;
    try{
        const user = await userModel.findById(userId)

        res.status(200).json(user)
    }
    catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

const getUser =async(req,res) =>{
    try{
        const users = await userModel.find();

        res.status(200).join(users);
    }catch(error){
        console.log(error);
        res.status(500).json(error);

    }
};

module.exports ={registerUser, loginUser, findUser, getUser};