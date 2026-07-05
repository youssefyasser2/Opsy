import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentAgent = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<{ agent?: any }>();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request.agent;
  },
);
