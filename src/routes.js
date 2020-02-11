import { Router } from 'express';

import UserController from './app/controllers/UserController';
import RecipientsController from './app/controllers/RecipientsController';
import SessionController from './app/controllers/SessionController';
import CourierController from './app/controllers/CourierController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);
// routes.put('/users', authMiddleware, UserController.update);

routes.post('/recipients', authMiddleware, RecipientsController.store);
routes.post('/couriers', authMiddleware, CourierController.store);
routes.put('/couriers/:id', authMiddleware, CourierController.update);
routes.post('/deliveryrecipients', authMiddleware, RecipientsController.store);
routes.put('/recipients/:id', authMiddleware, RecipientsController.update);

export default routes;
