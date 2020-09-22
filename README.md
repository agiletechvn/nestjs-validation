# INSTALL
```
npm install @agiletechvn/nestjs-validation
```
or
```
yarn add @agiletechvn/nestjs-validation
```

register app container at app module

```
import {useContainer} from "class-validator";

useContainer(app.select(AppModule), { fallbackOnErrors: true });
```

Customize error output
```
  import { ValidationPipe } from '@agiletech.vn/nestjs-validation';
...
  app.useGlobalPipes(new ValidationPipe());
```
=> example:

```
{
  message: "UnprocessableEntityException",
          statusCode: 422,
          details: {
            [key]: [messages1, messages2]
            ...
          },
}
```


in dto / entity ...
```
@ApiProperty()
@ServiceValidator(makeValidator(UsersService, 'checkExist'))
username: string;
```



## TODO
TBD