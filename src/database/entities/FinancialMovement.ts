import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import User from './User';

@Entity('financial_movements')
export default class FinancialMovement {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'uuid' })
    user_id: string;

    @Column()
    name: string;

    @Column()
    value: number;

    @Column()
    classification: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
