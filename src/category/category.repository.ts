import { UpdateCategoryDto } from './dto/update-category.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './Model/category.schema';
import { Model, Types } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private readonly model: Model<Category>,
  ) {}

  async create(category: CreateCategoryDto) {
    const newCategory = await new this.model({
      _id: new Types.ObjectId(),
      ...category,
    }).save();

    if (newCategory.parent_id) {
      await this.model.findOneAndUpdate(
        { _id: newCategory.parent_id },
        { $addToSet: { children: newCategory._id } },
        { new: true },
      );
    }

    return newCategory;
  }

  async findOne(id: string) {
    return await this.model
      .findOne({ _id: id })
      .populate({
        path: 'children',
        populate: {
          path: 'children',
          populate: { path: 'children', populate: { path: 'children' } },
        },
      })
      .lean<Category>(true);
  }
  async findAll() {
    return await this.model
      .find({ parent_id: null })
      .populate({
        path: 'children',
        populate: {
          path: 'children',
          populate: { path: 'children', populate: { path: 'children' } },
        },
      })
      .lean<Category[]>(true);
  }

  async deleteOne(id: string) {
    await this.model.findByIdAndDelete(id);
    return 'Xoa thanh cong';
  }

  async updateOne(
    id: string,
    categoryOld: Category,
    categoryNew: UpdateCategoryDto,
  ) {
    const updateCategory = await this.model.findOneAndUpdate(
      { _id: id },
      categoryNew,
      {
        new: true,
      },
    );

    if (categoryNew.parent_id) {
      await this.model.updateOne(
        { _id: updateCategory.parent_id },
        { $addToSet: { children: updateCategory._id } },
      );
    }

    if (
      categoryOld.parent_id.toString() &&
      categoryOld.parent_id.toString() !== categoryNew.parent_id
    ) {
      await this.model.updateOne(
        { _id: categoryOld.parent_id },
        { $pull: { children: categoryOld._id } },
      );
    }

    return updateCategory;
  }

  async updateStatusById(id: string, status: boolean) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { status }, { new: true })
      .lean<Category>(true);
  }
}
