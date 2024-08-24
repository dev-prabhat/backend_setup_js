import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/loginUser').post(loginUser)

export default router