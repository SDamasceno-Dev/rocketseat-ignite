/**
 * @file: ISpecificationsRepository
 * @description: Interface contract of specificationsRepository
 */

import { Specification } from '../model/Specification';

// DTO definition
interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): void;
  findbyName(name: string): Specification;
}

export { ICreateSpecificationDTO, ISpecificationsRepository };
