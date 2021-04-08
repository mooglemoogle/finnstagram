import { Post } from '@finn/models/Post';
import post1 from './post1';
import post2 from './post2';

export { post1, post2 };
const list = [post1, post2];

const postMap = list.reduce<Record<string, Post>>((acc, item) => {
    acc[item.id] = item;
    return acc;
}, {});

export { postMap };

export default list;
