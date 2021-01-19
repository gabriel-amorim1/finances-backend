import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import FinancialMovement from './FinancialMovement';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(
        () => FinancialMovement,
        financialMovement => financialMovement.user,
        {
            eager: true,
        },
    )
    financial_movements?: FinancialMovement[];
}
