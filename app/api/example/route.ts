import { NextRequest } from 'next/server';
import { ExampleController } from './example.controller';

const controller = new ExampleController();

export async function GET(request: NextRequest) {
  return controller.getAll(request);
}

export async function POST(request: NextRequest) {
  return controller.create(request);
}