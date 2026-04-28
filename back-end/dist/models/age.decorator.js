"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsHaveAge = IsHaveAge;
const class_validator_1 = require("class-validator");
function IsHaveAge(minAge, ValidationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: "IsHaveAge",
            target: object.constructor,
            propertyName,
            constraints: [minAge],
            options: ValidationOptions,
            validator: {
                validate(value, args) {
                    if (!(value instanceof Date) || isNaN(value.getTime()))
                        return false;
                    const [minAge] = args.constraints;
                    const today = new Date();
                    let age = today.getFullYear() - value.getFullYear();
                    const m = today.getMonth() - value.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < value.getDate())) {
                        age--;
                    }
                    return age >= minAge;
                },
                defaultMessage(args) {
                    const [minAge] = args.constraints;
                    return `User must be at least ${minAge} years old`;
                },
            }
        });
    };
}
//# sourceMappingURL=age.decorator.js.map