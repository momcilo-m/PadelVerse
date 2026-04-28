import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Max, Min } from "class-validator";
import { Complex } from "./complex.entity";

@Entity('review')
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user' })
    user: number

    @Column()
    @ManyToOne(() => Complex)
    @JoinColumn({ name: 'complex' })
    complex: number

    @Column()
    rating: number


}