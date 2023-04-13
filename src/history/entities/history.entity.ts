import { Entity,PrimaryGeneratedColumn, Column,CreateDateColumn } from "typeorm";

@Entity()
export class History {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar",length:36 })
    userId: string

    @Column({ type: "varchar",length:36  })
    videoId: string

    @CreateDateColumn({ type: "timestamp"})
    watchedAt: Date
}