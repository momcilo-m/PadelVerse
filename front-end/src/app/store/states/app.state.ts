import { ComplexStateInterface } from "./complex.state.interface";
import { RequestState } from "./request.state";
import { UserState } from "./user.state";


export interface AppState {
    userStatus: UserState,
    requestStatus: RequestState,
    complexStatus: ComplexStateInterface,
    weatherStatus: WeatherState
}