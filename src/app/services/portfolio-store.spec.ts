import { TestBed } from '@angular/core/testing';
import { PortfolioStore } from './portfolio-store';

describe('PortfolioStore', () => {
  let service: PortfolioStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
