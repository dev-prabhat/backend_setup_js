import { Router } from 'express'
import { createProduct, getAllProducts } from '../controllers/product.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

// product API routes
router.use(verifyJWT)
router.route('/p').get(getAllProducts)
router.route('/createProduct').post(createProduct)

export default router