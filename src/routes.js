import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';
import multerConfigSignature from './config/multer-signature';

import UserController from './app/controllers/UserController';
import RecipientsController from './app/controllers/RecipientsController';
import SessionController from './app/controllers/SessionController';
import DeliveryManController from './app/controllers/DeliveryManController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import authMiddleware from './app/middlewares/auth';
import DeliveryStartController from './app/controllers/DeliveryStartController';
import DeliveryEndController from './app/controllers/DeliveryEndController';

const routes = new Router();
const upload = multer(multerConfig);
const uploadSignature = multer(multerConfigSignature);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.post('/recipients', authMiddleware, RecipientsController.store);

routes.post('/deliverymans', authMiddleware, DeliveryManController.store);
routes.get('/deliverymans', authMiddleware, DeliveryManController.index);
routes.delete(
  '/deliverymans/:id',
  authMiddleware,
  DeliveryManController.delete
);
routes.put('/deliverymans/:id', authMiddleware, DeliveryManController.update);
routes.put('/recipients/:id', authMiddleware, RecipientsController.update);

routes.post(
  '/files',
  authMiddleware,
  upload.single('file'),
  FileController.store
);

routes.post('/orders', authMiddleware, OrderController.store);
routes.get('/orders', authMiddleware, OrderController.index);
routes.delete('/orders/:id', authMiddleware, OrderController.delete);

routes.put('/orders/:id', authMiddleware, OrderController.update);

routes.put('/order/:id/deliverystart', DeliveryStartController.update);

routes.put(
  '/order/signature',
  authMiddleware,
  uploadSignature.single('file'),
  DeliveryEndController.update
);
// routes.post('/orders/:id/deliveryend', DeliveryEndController.store);

export default routes;
