import { inject, injectable } from 'tsyringe';

import { SessionResponseInterface } from '../interfaces/SessionInterface';
import UserService from './UserService';
import * as sessionView from '../views/sessions_view';

@injectable()
class SessionService {
    constructor(
        @inject('UserService')
        private userService: UserService,
    ) {}

    public async create(
        email: string,
        password: string,
    ): Promise<SessionResponseInterface> {
        const user = await this.userService.checkPassword(email, password);

        return sessionView.render(user);
    }
}

export default SessionService;
