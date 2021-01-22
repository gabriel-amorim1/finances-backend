import { FinancialMovementInterface } from '../../interfaces/FinancialMovementInterface';

export default class FinancialMovementBuilder {
    financialMovement: FinancialMovementInterface;

    constructor() {
        this.financialMovement = {} as FinancialMovementInterface;
    }

    public withId(id: string): FinancialMovementBuilder {
        this.financialMovement.id = id;
        return this;
    }

    public withUserId(user_id: string): FinancialMovementBuilder {
        this.financialMovement.user_id = user_id;
        return this;
    }

    public withName(name: string): FinancialMovementBuilder {
        this.financialMovement.name = name;
        return this;
    }

    public withValue(value: number): FinancialMovementBuilder {
        this.financialMovement.value = value;
        return this;
    }

    public withClassification(classification: string): FinancialMovementBuilder {
        this.financialMovement.classification = classification;
        return this;
    }

    public withCreatedAt(createdAt: Date): FinancialMovementBuilder {
        this.financialMovement.created_at = createdAt;
        return this;
    }

    public withUpdatedAt(updatedAt: Date): FinancialMovementBuilder {
        this.financialMovement.updated_at = updatedAt;
        return this;
    }

    public build(): FinancialMovementInterface {
        return this.financialMovement;
    }
}
