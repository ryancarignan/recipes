import { Component, input, model } from '@angular/core';
import { emptyRecipe, Recipe } from '../models/recipe';
import { RecipeEditForm } from '../recipe-edit-form/recipe-edit-form';

@Component({
  selector: 'app-recipe-card',
  imports: [RecipeEditForm],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
})
export class RecipeCard {
  recipe = model<Recipe>(emptyRecipe);
  beingEdited = false;

  editRecipe() {
    this.beingEdited = true;
  }
}