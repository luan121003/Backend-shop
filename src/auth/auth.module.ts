import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService} from './auth.service' ;
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/iwt.strategy";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [JwtModule.registerAsync({
        useFactory: () => ({
          secret:
            'vVarX3ETLuR35pAe8LLVSEieaIxvBrz6X2B0eiN1HY4cdf3jYwBUKISJhDDXD60gsZiL9HLTYPoVwrSGa628XGmjJkGF04J3f4On',
          signOptions: {
            expiresIn: '24h',
            algorithm: 'HS256',
          },
        }),
      }), UserModule],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy],
})
export class AuthModule {}