import { Tournament } from "./tournament.entity";
export declare class Court {
    id: number;
    name: string;
    location: string;
    owner: number;
    open_time: string;
    close_time: string;
    tour: Tournament[];
}
