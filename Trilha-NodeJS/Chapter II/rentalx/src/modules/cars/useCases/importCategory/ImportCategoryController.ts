/**
 * @file: ImportCategoryController
 * @description: Controller to import categories
 */

// Dependecies import
import { Request, Response } from 'express';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  constructor(private importCategoryController: ImportCategoryUseCase) {}

  handle(req: Request, res: Response): Response {
    const { file } = req;

    this.importCategoryController.execute(file);

    return res.send();
  }
}

export { ImportCategoryController };
