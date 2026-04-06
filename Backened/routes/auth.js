import express from "express"
const router = express.Router()

import { signup, login } from "../controllers/authController.js"
import { validate } from "../middleware/validate.js"
import { signupSchema, loginSchema } from "../middleware/validators/authvalidator.js"

// Signup
router.post("/signup", validate(signupSchema), signup)

// Login
router.post("/login", validate(loginSchema), login)

export default router