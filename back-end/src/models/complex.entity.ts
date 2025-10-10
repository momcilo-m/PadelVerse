import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Tournament } from "./tournament.entity";

@Entity('complex')
export class Complex {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({ type: 'point' })
    location: string

    @Column()
    @ManyToOne(() => User)
    @JoinColumn({ name: 'owner' })
    owner: number

    @Column({ type: "time" })
    open_time: string

    @Column({ type: "time" })
    close_time: string

    // @Column({type:"decimal"})
    // price:number

    @Column()
    country: string

    @Column()
    city: string

    @Column()
    photo: string
}