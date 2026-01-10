import { Component, OnInit, input, output, model } from '@angular/core';
import { Recipe, Section, Ingredient } from '../models/recipe'
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule, NonNullableFormBuilder, FormControlName, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms'

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
  recipe = input.required<Recipe>();
  beingEdited = model.required<boolean>();
  // string if uploaded, null if not, undefined if deleted
  newImage!: string | null | undefined;
  update = output<Recipe | null>();

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit() {
    this.recipeForm = this.fb.group({
      name: [this.recipe().name, Validators.required],
      rating: [this.recipe().rating, [Validators.min(0), Validators.max(5)]],
      sections: this.fb.array(this.recipe().sections.map((s) => this.generateSection(s)), Validators.required)
    });
    this.newImage = null;
  }

  // custom validator for strict greater than
  greaterThan(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined || value === '')
        return null; // not present, can be caught by required
      if (value > min)
        return null;
      else
        return { greaterThan: { requiredValue: min, actualValue: value } };
    }
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
        name: [section.name, Validators.required],
        ingredients: this.fb.array(section.ingredients.map((i) => this.generateIngredient(i))),
        directions: this.fb.array(section.directions.map((d) => this.generateDirection(d)))
      });
    } else {
      return this.fb.group({
        name: ['', Validators.required],
        ingredients: this.fb.array<IngredientForm>([]),
        directions: this.fb.array<DirectionForm>([], Validators.required),
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
        quantity: [ingredient.quantity, [Validators.required, this.greaterThan(0)]]
      });
    } else {
      return this.fb.group({
        name: ['', Validators.required],
        unit: [''],
        quantity: [1, [Validators.required, this.greaterThan(0)]]
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

  removeImage() {
    this.newImage = undefined;
  }

  isInvalid(formControl: AbstractControl | null): boolean {
    return (
      formControl !== null &&
      formControl.invalid &&
      (formControl.dirty || formControl.touched)
    );
  }
  isInvalidRecipe(name: string): boolean {
    const formControl = this.recipeForm.get(name);
    return this.isInvalid(formControl);
  }
  isInvalidSection(sIndex: number, name: string): boolean {
    const formControl = this.recipeForm.controls.sections.at(sIndex).get(name);
    return this.isInvalid(formControl);
  }
  isInvalidIngredient(sIndex: number, iIndex: number, name: string): boolean {
    const formControl = this.recipeForm.controls.sections.at(sIndex).controls.ingredients.at(iIndex).get(name);
    return this.isInvalid(formControl);
  }
  isInvalidDirection(sIndex: number, dIndex: number, name: string): boolean {
    const formControl = this.recipeForm.controls.sections.at(sIndex).controls.directions.at(dIndex).get(name);
    return this.isInvalid(formControl);
  }

  // converts RecipeForm to Recipe and emits an event which updates recipes in app.html (or whatever passed it update)
  onSubmit() {
    console.log('Form submitted: ', this.recipeForm.getRawValue(), this.recipeForm.invalid);
    if (this.recipeForm.valid) {
      this.update.emit({
        id: this.recipe().id,
        name: this.recipeForm.controls.name.value,
        rating: this.recipeForm.controls.rating.value,
        image: (this.newImage !== null) ? this.newImage : this.recipe().image,
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
  }

  deleteRecipe() {
    if (confirm('Are you sure you want to permanently delete this recipe?')) {
      this.update.emit(null);
      this.beingEdited.set(false); // close popup
    }
  }

  close() {
    this.beingEdited.set(false);
  }
}
