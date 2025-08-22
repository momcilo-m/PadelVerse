import { Complex } from "../../components/complex/complex";
import { ComplexInterface } from "../../models/complex.interface";

export interface ComplexState
{
    selectedComplex:ComplexInterface | null;
    complex:ComplexInterface[]
}