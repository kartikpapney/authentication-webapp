import { ValidationOptions, registerDecorator, ValidationArguments, isEmail, isPhoneNumber } from 'class-validator';

export default function IsEitherEmailOrMobileNo(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEitherEmailOrMobileNo',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const id = args.object['id'];
          return (isEmail(id) || isPhoneNumber(id));
        },
        defaultMessage(args: ValidationArguments) {
          return `id should be email or mobile number`;
        },
      },
    });
  };
}
