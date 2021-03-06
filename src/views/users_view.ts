import { UserInterface } from '../interfaces/UserInterface';

export const render = (user: UserInterface): UserInterface => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
};
