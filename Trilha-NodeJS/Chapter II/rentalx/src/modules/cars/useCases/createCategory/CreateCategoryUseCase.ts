/**
 * @file: CreateCategoryUseCase
 * @description: Service to create a category
 */

// Models, Repositories and Services import
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

// Interfaces definition
interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryExists = this.categoriesRepository.findByName(name);

    if (categoryExists) {
      throw new Error('Category already exists!');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
