import { Entity,PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Like{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar",length:100 })
    userId: string

    @Column({ type: "varchar",length:100 })
    videoId: string

    @CreateDateColumn({ type: "timestamp"})
    likeAt: Date
}