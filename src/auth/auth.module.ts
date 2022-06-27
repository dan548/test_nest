import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport";
import { SECRET } from "src/config";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: SECRET,
            signOptions: {expiresIn: '60s'}
        })
    ],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService]
})
export class AuthModule {}