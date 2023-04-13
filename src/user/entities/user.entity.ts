import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 255 })
    uname: string

    @Column({ type: "varchar", length: 255 })
    pwd: string

    @CreateDateColumn({ type: "timestamp" })
    createTime: Date

    @Column({ type: "varchar", length: 255 })
    description: string

    @Column({ type: "varchar", length: 255 })
    sex: string

    @Column({ type: "int" })
    likeCount: number

    @Column({ type: "int" })
    fansCount: number

    @Column({ type: "int" })
    views: number


    @Column({ type: "varchar",length:100 })
    email: string

    @Column({ type: "varchar",length:100 })
    avatar: string

    @Column({type:"tinyint"})
    pause_history: boolean
}