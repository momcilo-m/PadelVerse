import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Complex } from "./complex.entity";

@Entity('tournaments')
export class Tournament
{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    start:Date

    @Column()
    end:Date

    @Column()
    country:string

    @Column()
    city:string

    @ManyToOne(()=>Complex)
    complex:Complex
}