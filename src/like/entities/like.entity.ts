import { Entity,PrimaryGeneratedColumn, Column, CreateDateColumn , ManyToOne,JoinColumn  } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Video } from "src/video/entities/video.entity";
@Entity()
export class Like{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar",length:100 })
    type: string

    @Column({ type: "varchar",length:100 })
    userId: string

    @Column({ type: "varchar",length:100 })
    hostId: string

    @CreateDateColumn({ type: "timestamp"})
    likeAt: Date
}