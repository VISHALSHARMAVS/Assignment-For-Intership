import express from "express";
import { adminRegister,adminLogin,createCar,getCars,updateCar ,deleteCar, getCarsByID   } from "../controllers/admin.controller.js";
const router = express.Router();

router.post('/register',adminRegister);
router.post('/login',adminLogin);
router.post('/cars', createCar);
router.get('/cars', getCars);
router.get('/cars/:id', getCarsByID);
router.put('/cars/:id', updateCar);
router.delete('/cars/:id', deleteCar);

export default router;