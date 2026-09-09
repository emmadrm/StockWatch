import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioPosition } from './portfolio-position';

describe('PortfolioPosition', () => {
  let component: PortfolioPosition;
  let fixture: ComponentFixture<PortfolioPosition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioPosition],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioPosition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
