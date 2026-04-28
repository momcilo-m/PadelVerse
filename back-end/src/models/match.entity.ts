import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team.entity";
import { Stats } from "./stats.entity";

@Entity("matches")
export class Match {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @ManyToOne(() => Team)
    @JoinColumn({ name: 'team1' })
    team1: number

    @Column()
    @ManyToOne(() => Team)
    @JoinColumn({ name: 'team2' })
    team2: number

    @Column()
    @OneToOne(() => Stats)
    @JoinColumn({ name: 'match_stats' })
    match_stats: number

    @Column()
    live: boolean
}