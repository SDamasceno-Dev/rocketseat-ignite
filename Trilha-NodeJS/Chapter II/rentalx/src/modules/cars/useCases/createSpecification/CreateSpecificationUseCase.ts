/**
 * @file: CreateSpecificationUseCase
 * @description: Service to create a specification
 */

import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

// Interfaces definition
interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}
  execute({ name, description }: IRequest): void {
    const specificationExists = this.specificationsRepository.findbyName(name);

    if (specificationExists) {
      throw new Error(`Specification already exists`);
    }

    this.specificationsRepository.create({ name, description });
  }
}
export { CreateSpecificationUseCase };
