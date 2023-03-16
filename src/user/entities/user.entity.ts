import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number

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
    views: number

    @Column({ type: "varchar" })
    birth: string


}