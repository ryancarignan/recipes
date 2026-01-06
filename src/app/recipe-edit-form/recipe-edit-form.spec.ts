import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditForm } from './recipe-edit-form';

describe('RecipeEditForm', () => {
  let component: RecipeEditForm;
  let fixture: ComponentFixture<RecipeEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeEditForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeEditForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
