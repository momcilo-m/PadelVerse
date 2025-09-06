import { ComplexInterface } from "../../models/complex.interface";

export interface ComplexState
{
    selectedComplexId:number;
    complex:ComplexInterface[]
    courts:CourtInterface[],
    avalaibleCourts:number[]
    selectedCorut:number
}