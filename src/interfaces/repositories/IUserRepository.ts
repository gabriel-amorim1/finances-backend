import { DeleteResult } from 'typeorm';
import User from '../../database/entities/User';
import { UserInterface } from '../UserInterface';

export default interface IUserRepository {
    createAndSave(userData: UserInterface): Promise<User>;
    findById(id: string): Promise<User | undefined>;
    getAll(): Promise<{ data: User[]; count: number }>;
    update(userUpdate: User): Promise<User>;
    remove(id: string): Promise<DeleteResult>;
}
