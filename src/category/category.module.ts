import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { DatabaseModule } from "src/Database/database.module";
import { Category, CategorySchema } from "./Model/category.schema";
import { CategoryRepository } from "./category.repository";

@Module({
    imports: [DatabaseModule,
        DatabaseModule.forFeature([
          { name: Category.name, schema: CategorySchema },
        ]),],
    controllers: [CategoryController],
    providers: [CategoryService, CategoryRepository],
})
export class CartegoryModule {}