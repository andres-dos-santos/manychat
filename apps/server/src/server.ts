import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'

import { userRouter } from './routes/user.routes'
import { groupRouter } from './routes/group.routes'

import { routeMiddleware } from './middlewares/route.middleware'

const app = express()

app.use(express.json())
app.use(cors({ origin: '*' }))

app.use(routeMiddleware)

app.use('/', userRouter)

app.use(clerkMiddleware())

app.use('/api/v1/groups', groupRouter)

const PORT = 8080

app.listen(PORT, () => {
	console.log(`🚀 server is running at http://locahost:${PORT}`)
})
