import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Complex } from "./complex.entity";

@Entity("courts")
export class Court
{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    @ManyToOne(()=>Complex)
    complex:number

    @Column()
    name:string
}