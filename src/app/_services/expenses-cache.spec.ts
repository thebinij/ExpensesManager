import { TestBed } from '@angular/core/testing';

import { ExpensesCacheService } from './expenses-cache.service';

describe('ExpensesCacheService', () => {
  let service: ExpensesCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
