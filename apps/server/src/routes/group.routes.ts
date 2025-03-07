import { Router } from 'express'

const groupRouter = Router()

groupRouter.post('/', async (_, res) => {
	res.status(200).send({ ok: true })
})

export { groupRouter }
