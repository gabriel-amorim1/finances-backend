import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import User from './User';

@Entity('spending_division_bases')
export default class SpendingDivisionBase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    user_id: string;

    @Column({ type: 'double precision' })
    essential_expenses: number;

    @Column({ type: 'double precision' })
    non_essential_expenses: number;

    @Column({ type: 'double precision' })
    wastes: number;

    @Column({ type: 'double precision' })
    investments: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToOne(() => User, user => user.spending_division_base, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user?: User;
}
