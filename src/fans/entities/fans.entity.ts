import { Entity,PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Fans{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar",length:100 })
    userId: string

    @Column({ type: "varchar",length:100 })
    fansId: string
}