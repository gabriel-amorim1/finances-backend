import { container } from 'tsyringe';

import IFinancialMovementRepository from '../interfaces/repositories/IFinancialMovementRepository';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import FinancialMovementRepository from '../repositories/financialMovement';
import UserRepository from '../repositories/user';
import UserService from '../services/UserService';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IFinancialMovementRepository>(
    'FinancialMovementRepository',
    FinancialMovementRepository,
);

container.registerSingleton<UserService>('UserService', UserService);
