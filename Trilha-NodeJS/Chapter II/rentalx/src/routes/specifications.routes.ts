/**
 * @file: specifications.routes
 * @description: The specifications routes
 */

// Dependencies import
import { Router } from 'express';

import { createCategoryController } from '../modules/cars/useCases/createCategory';

// Models, Repositories and Services import

const specificationsRoutes = Router();

specificationsRoutes.post('/', (req, res) => {
  return createCategoryController.handle(req, res);
});

export { specificationsRoutes };
