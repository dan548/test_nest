import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Card = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    
});