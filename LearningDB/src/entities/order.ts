import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { OrderDetail } from "./order-detail";

@Entity({ name: "order" })
export class Order {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({
    type: "timestamp",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  readonly date: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
