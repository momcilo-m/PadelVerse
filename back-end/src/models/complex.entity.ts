import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Tournament } from "./tournament.entity";
import { Review } from "./review.entity";

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

    @Column()
    rating: number

    @Column()
    votes: number

    @Column()
    priceMin: number

    @Column()
    priceMax: number

    @OneToMany(() => Review, review => review.complex)
    reviews: Review[];
}