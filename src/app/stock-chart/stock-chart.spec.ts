import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockChart } from './stock-chart';

describe('StockChart', () => {
  let component: StockChart;
  let fixture: ComponentFixture<StockChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockChart],
    }).compileComponents();

    fixture = TestBed.createComponent(StockChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
