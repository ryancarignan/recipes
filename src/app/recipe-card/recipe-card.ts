import { Component, input, output, model, OnInit } from '@angular/core';
import { emptyRecipe, Recipe, compareRecipes } from '../models/recipe';
import { RecipeEditForm } from '../recipe-edit-form/recipe-edit-form';

@Component({
  selector: 'app-recipe-card',
  imports: [RecipeEditForm],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
})
export class RecipeCard implements OnInit {
  recipe = input<Recipe>(emptyRecipe);
  recipeIsOpened = model<boolean>(false);
  beingEdited!: boolean;
  imageError!: boolean;
  update = output<Recipe | null>();

  ngOnInit() {
    // open editing form immediately if empty (probably new)
    if (compareRecipes(this.recipe(), emptyRecipe, false))
      this.beingEdited = true;
    else 
      this.beingEdited = false;
    this.imageError = false;
  }

  editRecipe() {
    console.log('hello, is this thing working? line 24 of recipe-card.ts');
    this.beingEdited = true;
    console.log('Recipe being edited: ', this.recipe());
  }

  onImageError() {
    this.imageError = true;
  }

  onImageLoad() {
    this.imageError = false;
  }

  // passes the signal back to the parent, from recipe-edit-form
  forwardUpdate(updatedRecipe: Recipe | null) {
    if (updatedRecipe === null) // close card if deleted
      this.recipeIsOpened.set(false);
    this.update.emit(updatedRecipe);
  }

  close() {
    this.beingEdited = false;
    this.recipeIsOpened.set(false);
  }
}