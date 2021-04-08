import { Router } from 'express';
import posts, { postMap } from '@finn/mocks/posts';
import { StatusCodes } from 'http-status-codes';

export default function (router: Router) {
    router.get('/post', (req, res) => {
        res.send(posts);
    });
    router.get('/post/:id', (req, res) => {
        const { id } = req.params;

        if (postMap[id]) {
            res.send(postMap[id]);
        } else {
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
    });
}
