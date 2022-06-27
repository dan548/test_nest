import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import * as argon2 from 'argon2';
import { isString, minLength } from "class-validator";
import { Observable } from "rxjs";

@Injectable()
export class HashPasswordInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        let password = context.switchToHttp().getRequest().body.password;
        if (!password) {
            throw new BadRequestException('password is undefined')
        }        
        const isCorrect = isString(password) && minLength(password, 8);
        if (!isCorrect) {
            throw new BadRequestException('password must be a string of >= 8 symbols')
        }
        password = await argon2.hash(password)
        context.switchToHttp().getRequest().body.password = password
        return next.handle();
    }
}