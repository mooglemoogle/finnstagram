import { Router } from 'express';
import userRoutes from './user';
import postRoutes from './posts';

const router = Router();

userRoutes(router);
postRoutes(router);

export default router;
