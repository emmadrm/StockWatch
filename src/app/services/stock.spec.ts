import { TestBed } from '@angular/core/testing';
import { Stock } from './stock';

describe('Stock', () => {
  let service: Stock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Stock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
