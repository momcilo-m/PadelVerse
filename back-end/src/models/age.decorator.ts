
import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsHaveAge(minAge:number,ValidationOptions?:ValidationOptions)
{
    return (object:any, propertyName:string) =>
    {
        registerDecorator(
            {
                name:"IsHaveAge",
                target:object.constructor,
                propertyName,
                constraints:[minAge],
                options:ValidationOptions,
                validator:
                {
                    validate(value: any, args: ValidationArguments) {
                        if (!(value instanceof Date) || isNaN(value.getTime())) return false;

                        const [minAge] = args.constraints;
                        const today = new Date();
                        let age = today.getFullYear() - value.getFullYear();
                        const m = today.getMonth() - value.getMonth();
                        if (m < 0 || (m === 0 && today.getDate() < value.getDate())) {
                            age--;
                        }

                        return age >= minAge;
                        },

                        defaultMessage(args: ValidationArguments) {
                            const [minAge] = args.constraints;
                            return `User must be at least ${minAge} years old`;
                        },
                    }
                }
        )
    }
}