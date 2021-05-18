/**
 * @file: CreateCategoryController
 * @description: The controller of service CreateCategory
 */

// Dependencies import
import { Request, Response } from 'express';

// Models, Repositories and Services import
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    this.createCategoryUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateCategoryController };
