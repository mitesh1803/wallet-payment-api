import express from 'express'
const router=express.Router()


import { getProfile, searchUsers, updateProfile } from '../controllers/userController.js'
import {authMiddleware} from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validate.js'
import {uservalidator} from '../middleware/validators/uservalidator.js'
router.use(authMiddleware)

//getprofile
router.get("/me",getProfile)

//search
router.get("/search",searchUsers)

//update
router.put("/update",validate(uservalidator),updateProfile)

export default router