import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Db, ObjectId } from 'mongodb';

export default function (router: Router, db: Db) {
    const users = db.collection('users');

    // router.get('/currentUser', (req, res) => {
    //     res.send(user1);
    // });
    // router.get('/users', (req, res) => {
    //     res.send(users);
    // });
    router.get(`/users/:userId`, async (req, res) => {
        const { userId } = req.params;

        const user = await users.findOne({_id: new ObjectId(userId)});
        if (user) {
            res.send(user);
        } else {
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
    });
}
