import { Column, Entity,PrimaryGeneratedColumn,CreateDateColumn } from "typeorm";

@Entity()
export class Marquee{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({type:"varchar",length:255})
    content:string

    @Column({type:"varchar",length:255})
    color:string

    @Column({type:"int"})
    time:number

    @Column({type:"varchar",length:255})
    video_id:string

    // @Column({type:"varchar",length:255})
    // size:string

    // @Column({type:"varchar",length:255})
    // position:string

    // @Column({type:"varchar",length:255})
    // opacity:string

    @Column({type:"varchar",length:255})
    sender_id:string
}