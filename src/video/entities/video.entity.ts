import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Video {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({ type: "varchar", length: 255 })
    author: string

    @Column({ type: "varchar", length: 255 })
    videoFile: string

    @CreateDateColumn({ type: "timestamp" })
    createTime: Date

    // @Column()
    // tag: Array<>

    @Column({ type: "varchar", length: 255 })
    introduction: string

    @Column({ type: "varchar", length: 255 })
    title: string

    @Column({ type: "int" })
    duration: number

    @Column({ type: "int" })
    likeCount: number

    @Column({ type: "int" })
    starCount: number

    @Column({ type: "int" })
    views: number

    @Column("uuid")
    uuid: string

}