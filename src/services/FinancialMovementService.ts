import { inject, injectable } from 'tsyringe';
import FinancialMovement from '../database/entities/FinancialMovement';
import { FinancialMovementInterface } from '../interfaces/FinancialMovementInterface';
import IFinancialMovementRepository from '../interfaces/repositories/IFinancialMovementRepository';
import { HttpError } from '../utils/errors/HttpError';
import UserService from './UserService';

@injectable()
class FinancialMovementService {
    constructor(
        @inject('FinancialMovementRepository')
        private financialMovementRepository: IFinancialMovementRepository,

        @inject('UserService')
        private userService: UserService,
    ) {}

    public async create(
        movementData: FinancialMovementInterface,
    ): Promise<FinancialMovement> {
        if (!(await this.userService.findById(movementData.user_id))) {
            throw new HttpError(404, 'User not found');
        }

        return this.financialMovementRepository.createAndSave(movementData);
    }

    public async findById(id: string): Promise<FinancialMovement> {
        const financialMovement = await this.financialMovementRepository.findById(
            id,
        );

        if (!financialMovement)
            throw new HttpError(404, 'Financial Movement not found');

        return financialMovement;
    }
}

export default FinancialMovementService;
