import { Router } from 'express';
import posts, { postMap } from '@finn/mocks/posts';
import comments from '@finn/mocks/comments';
import { StatusCodes } from 'http-status-codes';

export default function (router: Router) {
    router.get('/posts', (req, res) => {
        res.send(posts);
    });
    router.get('/posts/:postId', (req, res) => {
        const { postId } = req.params;

        if (postMap[postId]) {
            res.send(postMap[postId]);
        } else {
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
    });
    router.get('/posts/:postId/comments', (req, res) => {
        const { postId } = req.params;
        res.send(comments.filter(comment => comment.postId === postId));
    });
}
