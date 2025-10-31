import { ComplexInterface } from "../../models/complex.interface";

export interface ComplexStateInterface {
    selectedComplexId: number;
    complex: ComplexInterface[]
    courts: CourtInterface[],
    avalaibleCourts: number[]
    selectedCorut: number,
    count: number
}