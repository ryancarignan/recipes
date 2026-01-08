import { Component, InputSignal, ModelSignal, OnInit, input, model } from '@angular/core';
import { Recipe, Section, Ingredient, emptyRecipe } from '../models/recipe'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule, NonNullableFormBuilder } from '@angular/forms'

type IngredientForm = FormGroup<{
  name: FormControl<string>;
  unit: FormControl<string>;
  quantity: FormControl<number>;
}>;

type DirectionForm = FormGroup<{
  text: FormControl<string>;
}>;

type SectionForm = FormGroup<{
  name: FormControl<string>;
  ingredients: FormArray<IngredientForm>;
  directions: FormArray<DirectionForm>;
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
  recipe = model.required<Recipe>();
  beingEdited = model.required<boolean>();
  newImage!: string;

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit() {
    this.recipeForm = this.fb.group({
      name: [this.recipe().name, Validators.required],
      rating: [this.recipe().rating],
      sections: this.fb.array(this.recipe().sections.map((s) => this.generateSection(s)))
    });
    this.newImage = '';
  }

  /*
   * generateXyz will create a new Form from the given attribute or a blank one if none given
   * addXyz will add a new blank Form to this.recipeForm
   * removeXyz will remove a Form from the given index of this.recipeForm
   * 
   * initially the Recipe given is transformed into a Form, and the reverse only happens
   * on submission, i.e. changes are not saved until submit is clicked
   */

  generateSection(section?: Section): SectionForm {
    if (section !== undefined) {
      return this.fb.group({
        name: section.name,
        ingredients: this.fb.array(section.ingredients.map((i) => this.generateIngredient(i))),
        directions: this.fb.array(section.directions.map((d) => this.generateDirection(d)))
      });
    } else {
      return this.fb.group({
        name: [''],
        ingredients: this.fb.array<IngredientForm>([]),
        directions: this.fb.array<DirectionForm>([]),
      });
    }
  }

  addSection() {
    const newSection = this.generateSection();
    this.recipeForm.controls.sections.push(newSection);
  }

  removeSection(sIndex: number) {
    this.recipeForm.controls.sections.removeAt(sIndex);
  }

  generateIngredient(ingredient?: Ingredient): IngredientForm {
    if (ingredient !== undefined) {
      return this.fb.group({
        name: [ingredient.name, Validators.required],
        unit: [ingredient.unit],
        quantity: [ingredient.quantity, Validators.required]
      });
    } else {
      return this.fb.group({
        name: ['', Validators.required],
        unit: [''],
        quantity: [1, Validators.required]
      });
    }
  }

  addIngredient(sIndex: number) {
    const newIngredient = this.generateIngredient();
    this.recipeForm.controls.sections.at(sIndex)?.controls?.ingredients.push(newIngredient);
  }

  removeIngredient(sIndex: number, iIndex: number) {
    this.recipeForm.controls.sections.at(sIndex)?.controls?.ingredients.removeAt(iIndex);
  }

  generateDirection(direction?: string): DirectionForm {
    if (direction !== undefined) {
      return this.fb.group({
        text: [direction, Validators.required]
      });
    } else {
      return this.fb.group({
        text: ['', Validators.required]
      });
    }
  }

  addDirection(sIndex: number) {
    const newDirection = this.generateDirection();
    this.recipeForm.controls.sections.at(sIndex)?.controls?.directions.push(newDirection);
  }

  removeDirection(sIndex: number, dIndex: number) {
    this.recipeForm.controls.sections.at(sIndex)?.controls?.directions.removeAt(dIndex);
  }

  // Source - https://stackoverflow.com/a
  // Posted by Sourav Golui, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-01-07, License - CC BY-SA 4.0
  onFileChange(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    if (!eventTarget)
      return;
    const files = eventTarget.files as FileList;
    if (!files || files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      console.log("Unsupported filetype uploaded.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      const aNewImage = reader.result; 
      if (typeof aNewImage === 'string')
        this.newImage = aNewImage;
    }
  }

  // converts RecipeForm to Recipe and saves the state of this.recipeForm in this.recipe
  onSubmit() {
    console.log('Form submitted: ', this.recipeForm.getRawValue());
    this.recipe.set({
      name: this.recipeForm.controls.name.value,
      rating: this.recipeForm.controls.rating.value,
      image: (this.newImage.length > 0) ? this.newImage : this.recipe().image,
      sections: this.recipeForm.controls.sections.controls.map((s) => ({
        name: s.controls.name.value,
        ingredients: s.controls.ingredients.controls.map((i) => ({
          name: i.controls.name.value,
          unit: i.controls.unit.value,
          quantity: i.controls.quantity.value
        })),
        directions: s.controls.directions.controls.map((d) => (
          d.controls.text.value
        ))
      }))
    });
    this.beingEdited.set(false);
  }

  close() {
    this.beingEdited.set(false);
  }
}
