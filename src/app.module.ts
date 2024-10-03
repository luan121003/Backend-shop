import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CartegoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    CartegoryModule,
    ProductModule,
    CloudinaryModule,
  ],
})
export class AppModule {}
