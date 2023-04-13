import { Column, Entity,PrimaryGeneratedColumn,CreateDateColumn } from "typeorm";

@Entity()
export class Comment{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({type:"varchar",length:255})
    content:string

    @CreateDateColumn({ type: "timestamp" })
    createTime: Date

    @Column({type:"varchar",length:255})
    user_id:string

    @Column({type:"varchar",length:255})
    parent_id:string   //回复的是哪条评论

    @Column({type:"int"})
    upvotes:number

    @Column({type:"int"})
    downvotes:number

    @Column({type:"varchar",length:255})
    dynamic_id:string   // 视频或文字动态的id

    @Column({type:"varchar",length:255})
    type:string
}