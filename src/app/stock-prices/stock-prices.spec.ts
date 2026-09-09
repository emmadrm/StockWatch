import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockPrices } from './stock-prices';

describe('StockPrices', () => {
  let component: StockPrices;
  let fixture: ComponentFixture<StockPrices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockPrices],
    }).compileComponents();

    fixture = TestBed.createComponent(StockPrices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
