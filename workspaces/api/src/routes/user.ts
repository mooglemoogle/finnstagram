import { Router } from 'express';
import users, { user1, userMap } from '@finn/mocks/users';
import { StatusCodes } from 'http-status-codes';

export default function (router: Router) {
    router.get('/currentUser', (req, res) => {
        res.send(user1);
    });
    router.get('/users', (req, res) => {
        res.send(users);
    });
    router.get(`/users/:id`, (req, res) => {
        const { id } = req.params;

        if (userMap[id]) {
            res.send(userMap[id]);
        } else {
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
    });
}
