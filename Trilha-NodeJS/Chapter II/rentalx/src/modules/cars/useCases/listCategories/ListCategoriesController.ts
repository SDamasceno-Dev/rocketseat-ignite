/**
 * @file: ListCategoryController
 * @description: The controller of service ListCategory
 */

// Dependecies import
import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listcreateCategoryUseCase: ListCategoriesUseCase) {}
  handle(req: Request, res: Response): Response {
    const all = this.listcreateCategoryUseCase.execute();

    return res.json(all);
  }
}

export { ListCategoriesController };
