import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ReportsGuard } from './reports.guard';

describe('ReportsGuard', () => {
  let guard: ReportsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule]
    });
    guard = TestBed.inject(ReportsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
