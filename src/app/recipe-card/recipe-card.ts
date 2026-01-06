import { Component, input } from '@angular/core';
import { emptyRecipe, Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
})
export class RecipeCard {
  recipe = input<Recipe>(emptyRecipe);
}