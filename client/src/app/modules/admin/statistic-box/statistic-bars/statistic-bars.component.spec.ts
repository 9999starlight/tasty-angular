import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticBarsComponent } from './statistic-bars.component';

describe('StatisticBarsComponent', () => {
  let component: StatisticBarsComponent;
  let fixture: ComponentFixture<StatisticBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [StatisticBarsComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
