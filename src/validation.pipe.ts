import {
  UnprocessableEntityException,
  ValidationPipe as ValidationPipeBase,
  ValidationPipeOptions,
} from "@nestjs/common";

export class ValidationPipe extends ValidationPipeBase {
  constructor(options?: ValidationPipeOptions) {
    super({
      transform: true,
      errorHttpStatusCode: 422,
      exceptionFactory: (errors) => {
        throw new UnprocessableEntityException({
          message: "UnprocessableEntityException",
          statusCode: 422,
          details: errors.reduce(
            (acc, error) => {
              if (!acc[error.property]) {
                acc[error.property] = [];
              }

              Object.keys(error.constraints).forEach((c) => {
                acc[error.property].push(error.constraints[c]);
              });

              return acc;
            },
            {} as any
          ),
        });
      },
      ...options,
    });
  }
}
