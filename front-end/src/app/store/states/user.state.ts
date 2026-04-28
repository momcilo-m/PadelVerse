import { ComplexInterface } from "../../models/complex.interface";
import { User } from "../../models/user.interface";

export interface UserState {
    user: User | null;
    complex: ComplexInterface[],
    courts: CourtInterface[]
}