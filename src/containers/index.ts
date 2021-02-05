import { container } from 'tsyringe';

import IFinancialMovementRepository from '../interfaces/repositories/IFinancialMovementRepository';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import FinancialMovementRepository from '../repositories/financialMovement';
import UserRepository from '../repositories/user';
import SpendingDivisionService from '../services/ SpendingDivisionService';
import FinancialMovementService from '../services/FinancialMovementService';
import SessionService from '../services/SessionService';
import UserService from '../services/UserService';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IFinancialMovementRepository>(
    'FinancialMovementRepository',
    FinancialMovementRepository,
);

container.registerSingleton<UserService>('UserService', UserService);

container.registerSingleton<SessionService>('SessionService', SessionService);

container.registerSingleton<FinancialMovementService>(
    'FinancialMovementService',
    FinancialMovementService,
);

container.registerSingleton<SpendingDivisionService>(
    'SpendingDivisionService',
    SpendingDivisionService,
);
