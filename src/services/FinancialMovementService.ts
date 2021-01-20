import { inject, injectable } from 'tsyringe';
import { DeleteResult } from 'typeorm';
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

    public async getAll(): Promise<{ data: FinancialMovement[]; count: number }> {
        const users = await this.financialMovementRepository.getAll();

        return users;
    }

    public async update(
        id: string,
        movementUpdate: FinancialMovementInterface,
    ): Promise<FinancialMovement> {
        const foundMovement = await this.findById(id);

        return this.financialMovementRepository.update(
            Object.assign(foundMovement, { ...movementUpdate }),
        );
    }

    public async remove(id: string): Promise<DeleteResult> {
        await this.findById(id);

        return this.financialMovementRepository.remove(id);
    }
}

export default FinancialMovementService;
