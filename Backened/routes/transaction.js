import express from "express"
const router = express.Router()

import {sendMoney,getTransactions } from "../controllers/transactionController.js"
import { validate } from "../middleware/validate.js"
import { transactionSchema } from "../middleware/validators/transactionvalidator.js"
import {authMiddleware}  from '../middleware/authMiddleware.js'

// send
router.post("/send", authMiddleware,validate(transactionSchema), sendMoney)

// history
router.get("/history", authMiddleware, getTransactions)

export default router
