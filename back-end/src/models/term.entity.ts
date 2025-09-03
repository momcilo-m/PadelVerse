import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Court } from "./court.entity";

@Entity("terms")
export class Term
{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    @ManyToOne(()=>Court)
    @JoinColumn({name:'court'})
    court:number

    @Column()
    @ManyToOne(()=>User)
    @JoinColumn({name:'user'})
    user:number

    @Column()
    date:Date

    @Column({type:"time"})
    time:string

    @Column()
    equipment:boolean

    @Column()
    count:number

    @Column()
    players:number
}