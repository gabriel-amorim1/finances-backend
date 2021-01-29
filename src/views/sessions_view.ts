import jwt from 'jwt-promisify';
import { authConfig } from '../config/auth';
import { SessionResponseInterface } from '../interfaces/SessionInterface';
import { UserInterface } from '../interfaces/UserInterface';

export const render = async (
    user: UserInterface,
): Promise<SessionResponseInterface> => {
    return {
        user: {
            id: user.id!,
            name: user.name,
            email: user.email,
        },
        token: await jwt.sign({ id: user.id }, process.env.APP_SECRET!, {
            expiresIn: authConfig.expiresIn,
        }),
    };
};
