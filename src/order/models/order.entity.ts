import { Exclude, Expose } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Exclude()
    first_name: string;

    @Column()
    @Exclude()
    last_name: string;

    @Column()
    email_name: string;

    @CreateDateColumn()
    created_at: string;

    @OneToMany(()=>OrderItem, orderItem=>orderItem.order)
    order_Items: OrderItem[];

    @Expose()
    get name(): string {
        return `${this.first_name} ${this.last_name}` ;
    }

    @Expose()
    get total(): number {
        return this.order_Items.reduce((acc, {price, quantity})=> acc + price * quantity, 0);
    }

}
