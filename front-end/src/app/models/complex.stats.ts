export interface ComplexStatsMonth {

    totalCount: number,
    courtsCount: { [key: number]: number },
    amountPerWeek: [],
    user: {
        topUser: any
        count: number
    },
    totalAmount: number
}

export interface ComplexStatsWeek {
    totalCount: number,
    courtsCount: { [key: number]: number },
    totalAmount: number,
    todayCount: number,
    todayAmount: number
}

export interface ComplexGlobalStats {
    noOfComplex: number,
    noOfCourts: number,
    noOfTerms: number,
    totalAmount: number
}