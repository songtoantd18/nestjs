import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersDocument } from './users/model/users.schema';

const getCurrentUserByContext = (context: ExecutionContext): UsersDocument => {
  const request = context.switchToHttp().getRequest();
  return request.user as UsersDocument;
};
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
