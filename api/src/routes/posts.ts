import { Router } from 'express';
import { Db, ObjectId } from 'mongodb';
import { CreatePost, MediaItem, Post } from '@finn/models';
import { StatusCodes } from 'http-status-codes';

export default function (router: Router, db: Db) {
    const posts = db.collection<Post>('posts');
    router.get('/posts', async (req, res) => {
        const postQuery = posts.find({published: true});
        const postList = await postQuery.toArray();
        res.send(postList);
    });
    router.get('/posts/:postId', async (req, res) => {
        const { postId } = req.params;

        const post = await posts.findOne({_id: new ObjectId(postId)});
        if (post) {
            res.send(post);
        } else {
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
    });

    // Temporary hardcoded user id
    const userId = '610350faceed8fbf09bb16fc';
    router.post('/posts/', async (req, res) => {
        const body = req.body as CreatePost;
        const filledOut: Omit<Post, '_id'> = {
            user_id: new ObjectId(userId),
            createdDate: new Date(),
            published: false,
            likes: 0,
            ...body,
        }

        const result = await posts.insertOne(filledOut);

        res.send({
            ...filledOut,
            _id: result.insertedId
        });
    });

    router.post('/posts/:postId/media', async (req, res) => {
        const {postId} = req.params;
        const postObjId = new ObjectId(postId);
        const body = req.body as MediaItem;

        try {
            await posts.updateOne({_id: postObjId}, {
                '$push': { media: body }
            });

            const post = await posts.findOne({_id: postObjId});

            res.send(post);
        } catch (e) {
            res.status(500);
            res.send(e.message);
        }
    });
}
