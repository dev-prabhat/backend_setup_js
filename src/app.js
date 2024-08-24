import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({}))

app.use(express.json({limit: '20kb'})) // configure to take data in to form of json
app.use(express.urlencoded({extended:true, limit: '20kb'})) // configure to take data from url

// import routes 
import productRoutes from './routes/product.routes.js'
import categoryRoutes from './routes/category.routes.js'
import saleRouter from './routes/sale.routes.js'
import userRouter from './routes/user.routes.js'

app.use('/api/user',userRouter)
app.use('/api/products',productRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/sale',saleRouter)


export default app