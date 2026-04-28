
import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsMatch(property:string,ValidationOptions?:ValidationOptions)
{
    return (object:any, propertyName:string) =>
    {
        registerDecorator(
            {
                name:"IsMatch",
                target:object.constructor,
                propertyName,
                constraints:[],
                options:ValidationOptions,
                validator:
                {
                    validate(value: any, args: ValidationArguments) {
                        
                        [property] = args.constraints;
                        
                        const compared = (args.object as any)[property];

                        return value === compared;
                    },

                    defaultMessage(args: ValidationArguments) {
                        const [property] = args.constraints;
                        return `${args.property} must match with ${property}`;
                    },
                }
            }
        )
    }
}