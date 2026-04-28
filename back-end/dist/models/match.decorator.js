"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMatch = IsMatch;
const class_validator_1 = require("class-validator");
function IsMatch(property, ValidationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: "IsMatch",
            target: object.constructor,
            propertyName,
            constraints: [],
            options: ValidationOptions,
            validator: {
                validate(value, args) {
                    [property] = args.constraints;
                    const compared = args.object[property];
                    return value === compared;
                },
                defaultMessage(args) {
                    const [property] = args.constraints;
                    return `${args.property} must match with ${property}`;
                },
            }
        });
    };
}
//# sourceMappingURL=match.decorator.js.map