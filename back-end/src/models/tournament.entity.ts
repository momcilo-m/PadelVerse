import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tournaments')
export class Tournament
{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:String

    @Column()
    start:Date

    @Column()
    end:Date

    @Column()
    country:string

    @Column()
    city:string
}