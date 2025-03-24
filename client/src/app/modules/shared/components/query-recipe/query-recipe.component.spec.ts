import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryRecipeComponent } from './query-recipe.component';

describe('QueryRecipeComponent', () => {
  let component: QueryRecipeComponent;
  let fixture: ComponentFixture<QueryRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [QueryRecipeComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
