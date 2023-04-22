import { Column, Entity,PrimaryGeneratedColumn,CreateDateColumn } from "typeorm";

@Entity()
export class Dynamic{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({type:"varchar",length:100})
    user:string

    @CreateDateColumn({ type: "timestamp" })
    createTime: Date

    @Column({type:"text"})
    content:string

    @Column({type:"varchar",length:255})
    type:string   //视频还是文字

    @Column({type:"int"})
    likeCount:number

    @Column({type:"int"})
    repostCount:number

    @Column({type:"int"})
    commentCount:number   

    @Column({type:"int"})
    viewCount:number   

    @Column({type:"varchar",length:500})
    imgArr:string

}