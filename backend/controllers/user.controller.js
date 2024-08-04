import User from "../models/user.model.js";
import Car from "../models/car.model.js";
import jwt from 'jsonwebtoken'; 


// Register User 
const userRegister = async (req, res) => {
    const { username, email, password } = req.body;    
    try {
        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existedUser) {
            return res.status(409).json({
                msg: "User with email or username already exists"
            });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        if (!user) {
            return res.status(500).json({
                msg: "Something went wrong while registering the User"
            });
        }
        const createdUser = await User.findById(user._id).select("-password");
        if (!createdUser) {
            return res.status(500).json({
                msg: "Something went wrong while retrieving the User details"
            });
        }
        return res.status(201).json({
            msg: "User Registered Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error: " + error.message
        });
    }
};
//User Login
const userLogin = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;

    try {
        const { username, email, password } = req.body;
        if (!username && !email) {
            return res.status(400).json({
                msg: "Username or email is required !!"
            });
        }

        const user = await User.findOne({
            $or: [{ username: username }, { email: email }]
        });

        if (!user) {
            return res.status(404).json({
                msg: "User does not exist"
            });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                msg: "Invalid User Credentials"
            });
        }

        const token = jwt.sign({
            UserId: User._id
        }, JWT_SECRET); 
        localStorage.setItem(token,token)
        return res.json({
            
            token: token,
            msg: "User Logged In Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error: " + error.message
        });
    }
};
//Get Cars 
const getCars = async (req,res)=>{
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export  {userRegister,userLogin,getCars}