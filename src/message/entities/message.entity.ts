import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Message{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({type:"varchar",length:255})
    type:string

    @Column({type:"varchar",length:255})
    sender_id:string

    @Column({type:"varchar",length:255})
    receiver_id:string

    @Column({type:"text"})
    message_text:string

    @CreateDateColumn({ type: "timestamp" })
    createTime: Date

    @Column({type:"boolean"})
    is_read:boolean
}