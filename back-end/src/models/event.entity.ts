import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Team } from "./team.entity";
import { Stats } from "./stats.entity";
import { Match } from "./match.entity";

export enum EventType {
    POINT = "point",
    ACE = "ace",
    DOUBLE_ERROR = "double_error",
    ERROR = "error"
}

@Entity("match_events")
export class Event {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @OneToOne(() => Match)
    match: number

    @Column()
    @ManyToOne(() => Team)
    @JoinColumn({ name: 'team' })
    team: number

    @Column({
        type: 'enum',
        enum: EventType,
        enumName: 'event_values'
    })
    event: EventType
}