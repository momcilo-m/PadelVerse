export interface User
{
    id: number;

    first_name: string;

    last_name: string;

    email:string

    password:string
    
    phone:string

    birth:Date

    gender:boolean

    is_active: boolean;

    date_created: Date;

    token_registration:string
}