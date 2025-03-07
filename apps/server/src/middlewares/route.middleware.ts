import type { NextFunction, Request, Response } from 'express'

export function routeMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	console.log(`[${req.method}] ${req.path}`)

	next()
}
