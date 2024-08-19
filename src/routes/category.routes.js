import { Router } from 'express'
import { createCategory , getAllCategories} from '../controllers/category.controller.js'

const router = Router()


router.route('/c').get(getAllCategories)
router.route('/createCategory').post(createCategory)


export default router