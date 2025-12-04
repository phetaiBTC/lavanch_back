import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/shared/decorator/auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const handler = context.getHandler();
    const clazz = context.getClass();
    const handlerName = handler?.name ?? '<unknown_handler>';
    const className = clazz?.name ?? '<unknown_class>';
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      handler,
      clazz,
    ]);

    // Debug logging to help diagnose unexpected 401s for @Public routes
    // These logs are temporary — they will print which handler/class and the
    // resolved isPublic flag so you can confirm whether the metadata is present.
    // Remove or lower log level once the issue is resolved.
    // eslint-disable-next-line no-console
    // console.debug(
    //   `[JwtAuthGuard] handler=${className}.${handlerName} isPublic=${Boolean(
    //     isPublic,
    //   )}`,
    // );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
