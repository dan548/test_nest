import { Routes } from "@nestjs/core";
import { UserModule } from "./user";

export const appRoutes: Routes = [
    {
        path: 'users',
        module: UserModule
    }
];