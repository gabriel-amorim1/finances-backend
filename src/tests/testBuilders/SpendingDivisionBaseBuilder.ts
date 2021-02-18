import { SpendingDivisionBaseInterface } from '../../interfaces/SpendingDivisionBaseInterface';

export default class SpendingDivisionBaseBuilder {
    spendingDivisionBase: SpendingDivisionBaseInterface;

    constructor() {
        this.spendingDivisionBase = {} as SpendingDivisionBaseInterface;
    }

    public withId(id: string): SpendingDivisionBaseBuilder {
        this.spendingDivisionBase.id = id;
        return this;
    }

    public withUserId(user_id: string): SpendingDivisionBaseBuilder {
        this.spendingDivisionBase.user_id = user_id;
        return this;
    }

    public withEssentialExpenses(
        essential_expenses: number,
    ): SpendingDivisionBaseBuilder {
        this.spendingDivisionBase.essential_expenses = essential_expenses;
        return this;
    }

    public withNonEssentialExpenses(
        non_essential_expenses: number,
    ): SpendingDivisionBaseBuilder {
        this.spendingDivisionBase.non_essential_expenses = non_essential_expenses;
        return this;
    }

    public withWastes(wastes: number): SpendingDivisionBaseBuilder {
        this.spendingDivisionBase.wastes = wastes;
        return this;
    }

    public withInvestments(investments: number): SpendingDivisionBaseBuilder {
        this.spendingDivisionBase.investments = investments;
        return this;
    }

    public withCreatedAt(createdAt: Date): SpendingDivisionBaseBuilder {
        this.spendingDivisionBase.created_at = createdAt;
        return this;
    }

    public withUpdatedAt(updatedAt: Date): SpendingDivisionBaseBuilder {
        this.spendingDivisionBase.updated_at = updatedAt;
        return this;
    }

    public build(): SpendingDivisionBaseInterface {
        return this.spendingDivisionBase;
    }
}
