import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

@Entity()
export class Video{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    author: string;

    @Column({ length: 255 })
    videoFile: string;

    @Column({ default: "" })
    createTime: string;

    @Column({ length: 255 })
    tag: string;

    @Column({ length: 255 })
    introduction: string;

    @Column({ length: 255 })
    title: string;

    @Column({ default: 0 })
    duration: number;

    @Column({ default: 0 })
    likeCount: number;

    @Column({ default: 0 })
    starCount: number;
}