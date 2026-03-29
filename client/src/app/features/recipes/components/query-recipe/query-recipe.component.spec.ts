import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryRecipe } from './query-recipe';

describe('QueryRecipe', () => {
  let component: QueryRecipe;
  let fixture: ComponentFixture<QueryRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryRecipe],
    }).compileComponents();

    fixture = TestBed.createComponent(QueryRecipe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
