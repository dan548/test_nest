import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from "src/user/dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUserCredentials(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);

        if (user && user.password === password) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async loginWithCredentials(user: LoginUserDto) {
        const payload = { username: user.email, sub: user.email };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}