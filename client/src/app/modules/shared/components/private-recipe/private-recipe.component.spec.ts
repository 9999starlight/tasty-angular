import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateRecipeComponent } from './private-recipe.component';

describe('PrivateRecipeComponent', () => {
  let component: PrivateRecipeComponent;
  let fixture: ComponentFixture<PrivateRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
