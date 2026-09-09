import { TestBed } from '@angular/core/testing';
import { SelectedStock } from './selected-stock';

describe('SelectedStock', () => {
  let service: SelectedStock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedStock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
