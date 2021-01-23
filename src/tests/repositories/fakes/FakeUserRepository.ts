import { DeleteResult } from 'typeorm';
import { v4 } from 'uuid';

import User from '../../../database/entities/User';
import { OptionsTypeOrmGetAll } from '../../../interfaces/pagination';
import IUserRepository from '../../../interfaces/repositories/IUserRepository';
import { UserInterface } from '../../../interfaces/UserInterface';

export default class FakeUserRepository implements IUserRepository {
    private users: User[] = [];

    public async createAndSave(userData: UserInterface): Promise<User> {
        const user = Object.assign(new User(), userData);

        user.id = v4();
        user.financial_movements = [];
        user.created_at = new Date();
        user.updated_at = new Date();

        this.users.push(user);

        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const userFound = this.users.find(user => user.id === id);

        return userFound;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const userFound = this.users.find(user => user.email === email);

        return userFound;
    }

    public async getAll(
        options: OptionsTypeOrmGetAll,
    ): Promise<{ data: User[]; count: number }> {
        const data = this.users;
        const count = this.users.length;

        return { data, count };
    }

    public async update(userUpdate: User): Promise<User> {
        const findIndex = this.users.findIndex(user => user.id === userUpdate.id);

        this.users[findIndex] = userUpdate;

        return this.users[findIndex];
    }

    public async remove(id: string): Promise<DeleteResult> {
        this.users = this.users.filter(user => user.id !== id);
        return <any>{ raw: [] };
    }
}
