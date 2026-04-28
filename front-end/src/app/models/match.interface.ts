export interface MatchInterface {
    id: number,
    team1: {
        id:number
        name: string,
        photo: string
    },
    team2: {
        id:number,
        name: string,
        photo: string
    },
    live: boolean
}