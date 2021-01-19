import User from '../../database/entities/User';
import { UserInterface } from '../UserInterface';

export default interface IUserRepository {
    createAndSave(userData: UserInterface): Promise<User>;
    findById(id: string): Promise<User | undefined>;
}
