import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Team } from "./team.entity";

@Entity("players")
export class Player {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @OneToOne(() => User)
    user: number

    @Column()
    @ManyToOne(() => Team)
    team: number

    @Column()
    score: number
}