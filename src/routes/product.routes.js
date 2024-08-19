import { Router } from 'express'
import { createProduct } from '../controllers/product.controller.js'

const router = Router()

router.route('/p').get()
router.route('/createProduct').post(createProduct)

export default router