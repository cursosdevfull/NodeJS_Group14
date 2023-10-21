import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Order } from "./order";

@Entity({ name: "order_detail" })
export class OrderDetail {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: "int", nullable: false })
  readonly quantity: number;

  @Column({ type: "int", nullable: false })
  readonly productId: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;
}
