/**
 * @file: Category
 * @description: Model definition of the entity category
 */

// Dependencies import
import { v4 as uuidv4 } from 'uuid';

// Classes definition
class Category {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Category };
