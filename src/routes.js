import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import RecipientsController from './app/controllers/RecipientsController';
import SessionController from './app/controllers/SessionController';
import CourierController from './app/controllers/CourierController';
import FileController from './app/controllers/FileController';
import PackageController from './app/controllers/PackageController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.post('/recipients', authMiddleware, RecipientsController.store);
routes.post('/couriers', authMiddleware, CourierController.store);
routes.get('/couriers', authMiddleware, CourierController.index);
routes.delete('/couriers/:id', authMiddleware, CourierController.delete);
routes.put('/couriers/:id', authMiddleware, CourierController.update);
routes.post('/deliveryrecipients', authMiddleware, RecipientsController.store);
routes.put('/recipients/:id', authMiddleware, RecipientsController.update);

routes.post(
  '/files',
  authMiddleware,
  upload.single('file'),
  FileController.store
);

routes.post('/packages', authMiddleware, PackageController.store);
routes.get('/packages', authMiddleware, PackageController.index);
routes.delete('/packages/:id', authMiddleware, PackageController.delete);
routes.put('/packages/:id', authMiddleware, PackageController.update);

export default routes;
