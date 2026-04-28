import { Test, TestingModule } from '@nestjs/testing';
import { ComplexController } from './complex.controller';

describe('ComplexController', () => {
  let controller: ComplexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplexController],
    }).compile();

    controller = module.get<ComplexController>(ComplexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
