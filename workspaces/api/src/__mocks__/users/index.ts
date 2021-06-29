import user1 from './user1';
import { User } from '@finn/models/User';

export { user1 };

const userList = [user1];

const userMap = userList.reduce<Record<string, User>>((acc, item) => {
    acc[item.id] = item;
    return acc;
}, {});

export { userMap };

export default [user1];
