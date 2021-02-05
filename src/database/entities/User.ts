import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import bcrypt from 'bcrypt';
import FinancialMovement from './FinancialMovement';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    password: string;

    @Column()
    password_hash: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(
        () => FinancialMovement,
        financialMovement => financialMovement.user,
        {
            eager: true,
            cascade: true,
        },
    )
    financial_movements?: FinancialMovement[];

    @BeforeInsert()
    @BeforeUpdate()
    private async savePasswordHash(): Promise<void> {
        if (this.password) {
            this.password_hash = await bcrypt.hash(this.password, 8);
        }
    }

    checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password_hash);
    }
}
