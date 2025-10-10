export interface ComplexInterface {
    id: number,
    owner: number,
    location: {
        x: number,
        y: number
    },
    name: string,
    open_time: string,
    close_time: string,
    country: string,
    city: string,
    photo: string
}