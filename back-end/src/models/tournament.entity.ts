import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Court } from "./court.entity";

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

    @ManyToMany(()=>Court,court=>court.tour)
    @JoinTable({
        name: 'court_tournament',
        joinColumn: {
            name: 'court',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'tournament', 
            referencedColumnName: 'id'
        }
    })
    court:Court[]
}