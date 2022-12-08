import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { categoryProviders } from "./categories.provider";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService, ...categoryProviders],
  exports: [CategoryService, ...categoryProviders],
})
export class CategoriesModule {}