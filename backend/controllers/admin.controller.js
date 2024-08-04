import Admin from "../models/admin.model.js";

import jwt from 'jsonwebtoken'; 

import Car from "../models/car.model.js";

//Register Admin
const adminRegister = async (req, res) => {
    const { username, email, password } = req.body;    
    try {
        const existedUser = await Admin.findOne({
            $or: [{ username }, { email }]
        });

        if (existedUser) {
            return res.status(409).json({
                msg: "Admin with email or username already exists"
            });
        }

        const admin = await Admin.create({
            username,
            email,
            password
        });

        const createdAdmin = await Admin.findById(admin._id).select("-password");
        if (!createdAdmin) {
            return res.status(500).json({
                msg: "Something went wrong while registering the Admin"
            });
        }

        return res.status(201).json({
            msg: "Admin Registered Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error: " + error.message
        });
    }
};

const adminLogin = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;

    try {
        const { username, email, password } = req.body;
        if (!username && !email) {
            return res.status(400).json({
                msg: "Username or email is required !!"
            });
        }

        const admin = await Admin.findOne({
            $or: [{ username: username }, { email: email }]
        });

        if (!admin) {
            return res.status(404).json({
                msg: "Admin does not exist"
            });
        }

        const isPasswordValid = await admin.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                msg: "Invalid User Credentials"
            });
        }

        const token = jwt.sign({
            adminId: admin._id
        }, JWT_SECRET); 

        return res.json({
            token: token,
            msg: "Admin Logged In Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error: " + error.message
        });
    }
};

// Create car
const createCar = async (req, res) => {
    const { name, manufacturingYear, price } = req.body;
    try {
        // const newCar = new Car({ name, manufacturingYear, price });
        const car = await Car.create({
            name, manufacturingYear, price 
        })
        // await newCar.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all cars
const getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getCarsByID = async(req,res)=>{
    const {id} = req.params;
    try {
        const car = await Car.findById(id);
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

// Update car
const updateCar = async (req, res) => {
    const { id } = req.params;
    const { name, manufacturingYear, price } = req.body;
    try {
        const car = await Car.findByIdAndUpdate(id, { name, manufacturingYear, price }, { new: true });
      
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete car
const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        await Car.findByIdAndDelete(id);
        res.status(200).json({ message: 'Car deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { adminRegister, adminLogin, createCar, getCars, updateCar, deleteCar,getCarsByID };
