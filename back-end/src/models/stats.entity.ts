import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Team } from "./team.entity"

export enum PointType {
    LOVE = "0",
    FIFTEEN = "15",
    THIRTY = "30",
    FORTY = "40",
    ADVANTAGE = "AD"
}

@Entity("match_stats")
export class Stats {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    set_t1: number

    @Column()
    set_t2: number

    @Column()
    game_t1: number

    @Column()
    game_t2: number

    @Column({
        type: 'enum',
        enum: PointType,
    })
    points_t1: string

    @Column({
        type: 'enum',
        enum: PointType,
    })
    points_t2: string

    @Column()
    @ManyToOne(() => Team)
    @JoinColumn({ name: 'currentServe' })
    currentServe: number;

}