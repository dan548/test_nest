import { Controller, Post, Request, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HashPasswordInterceptor } from "src/shared/hash-password.interceptor";
import { ValidationPipe } from "src/shared/pipes/validation.pipe";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@ApiBearerAuth()
@ApiTags('auth')
@Controller()
export class AuthController {

    constructor(private authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @UseGuards(LocalAuthGuard)
    @UseInterceptors(HashPasswordInterceptor)
    @Post('login')
    async login(@Request() req) {
        return this.authService.loginWithCredentials(req.user);
    }

}

