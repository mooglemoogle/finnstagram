import { Router } from 'express';
import userRoutes from './user';
import postRoutes from './posts';
import { Db } from 'mongodb';

export default (db: Db) => {
    const router = Router();

    userRoutes(router, db);
    postRoutes(router, db);
    
    return router;
}