import { Component, OnInit } from '@angular/core';
import { Recipe, Section, Ingredient, emptyRecipe } from '../models/recipe'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule, NonNullableFormBuilder } from '@angular/forms'

type SectionForm = FormGroup<{
  name: FormControl<string>;
  ingredients: FormArray<FormControl<string>>;
  directions: FormArray<FormControl<string>>;
}>;

type RecipeForm = FormGroup<{
  name: FormControl<string>;
  rating: FormControl<number>;
  sections: FormArray<SectionForm>;
}>;

@Component({
  standalone: true,
  selector: 'app-recipe-edit-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './recipe-edit-form.html',
  styleUrl: './recipe-edit-form.scss',
})
export class RecipeEditForm implements OnInit {

  recipeForm!: RecipeForm;

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit() {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      rating: [0],
      sections: this.fb.array<SectionForm>([])
    });
  }

  generateSection(): SectionForm {
    return this.fb.group({
      name: [''],
      ingredients: this.fb.array<FormControl<string>>([]),
      directions: this.fb.array<FormControl<string>>([]),
    });
  }

  addSection() {
    this.recipeForm.controls.sections.push(this.generateSection());
  }

  removeSection(sIndex: number) {
    this.recipeForm.controls.sections.removeAt(sIndex);
  }

  addIngredient(sIndex: number) {
    const newIngredient: FormControl<string> = this.fb.control('', { validators: Validators.required });
    this.recipeForm.controls.sections.at(sIndex)?.controls?.ingredients.push(newIngredient);
  }

  removeIngredient(sIndex: number, iIndex: number) {
    this.recipeForm.controls.sections.at(sIndex)?.controls?.ingredients.removeAt(iIndex);
  }

  addDirection(sIndex: number) {
    const newDirection: FormControl<string> = this.fb.control('', { validators: Validators.required });
    this.recipeForm.controls.sections.at(sIndex)?.controls?.directions.push(newDirection);
  }

  removeDirection(sIndex: number, dIndex: number) {
    this.recipeForm.controls.sections.at(sIndex)?.controls?.directions.removeAt(dIndex);
  }

  onSubmit() {
    console.log('Form submitted: ', this.recipeForm.getRawValue());
  }
}
