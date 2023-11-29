import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseItemService } from './purchase-item.service';

describe('PurchaseItemService', () => {
  let service: PurchaseItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseItemService],
    }).compile();

    service = module.get<PurchaseItemService>(PurchaseItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
