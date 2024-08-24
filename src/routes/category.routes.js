import { Router } from 'express'
import { createCategory , getAllCategories} from '../controllers/category.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.use(verifyJWT)
router.route('/c').get(getAllCategories)
router.route('/createCategory').post(createCategory)


export default router