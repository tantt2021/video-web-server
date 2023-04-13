import { Entity,PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Following{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar",length:100 })
    userId: string

    @Column({ type: "varchar",length:100 })
    followId: string
}