import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Match } from "./match.entity"
import { User } from "./user.entity"

@Entity("chats")
export class Chat {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @OneToOne(() => Match)
    @JoinColumn({ name: 'match' })
    match: number

    @Column()
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user' })
    user: number

    @Column()
    message: string

    @CreateDateColumn({ type: 'timestamp' })
    time: Date;
}