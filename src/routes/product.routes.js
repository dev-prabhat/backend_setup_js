import { Router } from 'express'
import { createProduct, getAllProducts } from '../controllers/product.controller.js'

const router = Router()

router.route('/p').get(getAllProducts)
router.route('/createProduct').post(createProduct)

export default router