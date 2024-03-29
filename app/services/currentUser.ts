import { CurrentUser } from '../redux/currentUser/types';

export const getCurrentUser = (): Promise<CurrentUser> => {
    // Mock function
    return new Promise(resolve =>
        resolve({
            _id: '1',
            username: 'TestUsername',
            email: 'chris@abysmalsoft.org',
            displayName: "User 1"
        })
    );
};
