import express from "express"
import {userRegister,userLogin, getCars} from "../controllers/user.controller.js"
const router = express.Router();
router.post('/register',userRegister);
router.post('/login',userLogin);
router.get('/cars', getCars);
export default router;