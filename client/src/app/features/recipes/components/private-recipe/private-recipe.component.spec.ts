import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateRecipe } from './private-recipe';

describe('PrivateRecipe', () => {
  let component: PrivateRecipe;
  let fixture: ComponentFixture<PrivateRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateRecipe],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateRecipe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
