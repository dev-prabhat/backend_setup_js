import { Router } from "express";
import { loginUser } from "../controllers/user.controller.js";

const router = Router()

// user API route
router.route('/loginUser').post(loginUser)

export default router