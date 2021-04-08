import { Router } from 'express';
import users, { user1 } from '@finn/mocks/users';

export default function (router: Router) {
    router.get('/currentUser', (req, res) => {
        res.send(user1);
    });
    router.get('/user', (req, res) => {
        res.send(users);
    });
}
