import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentAgent = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.agent;
  },
);
