import { getRepository, Repository } from 'typeorm';
import User from '../database/entities/User';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import { UserInterface } from '../interfaces/UserInterface';

export default class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async createAndSave(userData: UserInterface): Promise<User> {
        const user = this.ormRepository.create(userData);

        return this.ormRepository.save(user);
    }

    public async findById(id: string): Promise<User | undefined> {
        return this.ormRepository.findOne(id);
    }
}
