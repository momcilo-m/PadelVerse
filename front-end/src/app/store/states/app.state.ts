import { User } from "../../models/user.interface";
import { ComplexState } from "./complex.state";
import { RequestState } from "./request.state";
import { UserState } from "./user.state";


export interface AppState
{
    userStatus:UserState,
    requestStatus:RequestState,
    complexStatus:ComplexState
}