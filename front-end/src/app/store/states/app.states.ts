import { User } from "../../models/user.interface";

export interface userState
{
    user:User | null;
    loading:boolean,
    error:boolean,
    message:string
}

export interface AppState
{
    userStatus:userState
}