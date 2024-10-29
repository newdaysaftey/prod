import { BaseService } from '../services/base.service';

export class ExampleService extends BaseService {
  async findAll() {
    // Implement your database logic here
    return [];
  }

  async create(data: any) {
    // Implement your database logic here
    return data;
  }
}