import { Type } from "@nestjs/common";
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { getFromContainer, useContainer } from "typeorm";

export function makeValidator<T = any>(service: Type<any>, method: keyof T | string) {
  @ValidatorConstraint({ async: true })
  class ServiceConstraint implements ValidatorConstraintInterface {
    constructor() {}

    async validate(value: any, args: ValidationArguments) {
      return await getFromContainer(service)[method](value, args);
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
      return "invalid: " + validationArguments.value;
    }
  }

  return ServiceConstraint;
}

export function ServiceValidator(
  service: ValidatorConstraintInterface,
  validationOptions?: ValidationOptions
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: service,
    });
  };
}
