/**
 * @file: ICategoriesRepository
 * @description: Interface contract of categoriesRepository
 */

// Models, Repositories and Services import
import { Category } from '../model/Category';

// DTO definition
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
