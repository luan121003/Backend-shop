import { Controller, Module } from "@nestjs/common";
import { Model } from "mongoose";
import { UserController } from "./user.controller";
import { DatabaseModule } from "src/Database/database.module";
import { User, UserSchema } from "./model/user.schema";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

@Module({
    imports: [
        DatabaseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ])
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [],
})
export class UserModule {}