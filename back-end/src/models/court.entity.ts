import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Complex } from "./complex.entity";

@Entity("courts")
export class Court
{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>Complex)
    @JoinColumn({name:"complex"})
    complex:Complex

    @Column()
    name:string
}