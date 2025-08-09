import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('courts')
export class Court
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string

    @Column({type:'point'})
    location:string

    @Column()
    @ManyToOne(() => User)
    @JoinColumn({ name: 'owner' })
    owner:number


    @Column({type:"time"})
    open_time:Date

    @Column({type:"time"})
    close_time:Date
}