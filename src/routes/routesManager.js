import { Router } from 'express';
const routesManager = Router();

/**
 * Example of route
 */
routesManager.get('/', (req, res) => {
	const status = 200;
	console.log(status)
	res.status(status).end();
});


export default routesManager;
