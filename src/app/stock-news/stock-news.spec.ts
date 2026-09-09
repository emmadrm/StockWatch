import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockNews } from './stock-news';

describe('StockNews', () => {
  let component: StockNews;
  let fixture: ComponentFixture<StockNews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockNews],
    }).compileComponents();

    fixture = TestBed.createComponent(StockNews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
