import { NextRequest } from 'next/server';
import { BaseController } from '../controllers/base.controller';
import { ExampleService } from './example.service';

export class ExampleController extends BaseController {
  private service: ExampleService;

  constructor() {
    super();
    this.service = new ExampleService();
  }

  async getAll(request: NextRequest) {
    try {
      const data = await this.service.findAll();
      return this.sendSuccess(data);
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async create(request: NextRequest) {
    try {
      const body = await this.parseBody(request);
      const data = await this.service.create(body);
      return this.sendSuccess(data, 'Created successfully');
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
}