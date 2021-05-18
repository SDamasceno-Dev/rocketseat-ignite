/**
 * @file: CreateSpecificationController
 * @description: The controller of service CreateSpecification
 */

// Dependecies import
import { Request, Response } from 'express';

// Models, Repositories and Services import
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    this.createSpecificationUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateSpecificationController };
