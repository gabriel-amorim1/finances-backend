import { FinancialMovementInterface } from '../../interfaces/FinancialMovementInterface';
import { UserInterface } from '../../interfaces/UserInterface';

export default class UserBuilder {
    user: UserInterface;

    constructor() {
        this.user = {} as UserInterface;
    }

    public withId(id: string): UserBuilder {
        this.user.id = id;
        return this;
    }

    public withName(name: string): UserBuilder {
        this.user.name = name;
        return this;
    }

    public withEmail(email: string): UserBuilder {
        this.user.email = email;
        return this;
    }

    public withPassword(password: string): UserBuilder {
        this.user.password = password;
        return this;
    }

    public withPasswordHash(password_hash: string): UserBuilder {
        this.user.password_hash = password_hash;
        return this;
    }

    public withCreatedAt(createdAt: Date): UserBuilder {
        this.user.created_at = createdAt;
        return this;
    }

    public withUpdatedAt(updatedAt: Date): UserBuilder {
        this.user.updated_at = updatedAt;
        return this;
    }

    public withFinancialMovements(
        financial_movements: FinancialMovementInterface[],
    ): UserBuilder {
        this.user.financial_movements = financial_movements;
        return this;
    }

    public build(): UserInterface {
        return this.user;
    }
}
