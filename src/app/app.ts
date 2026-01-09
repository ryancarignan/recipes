import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Recipe, Section, Ingredient, emptyRecipe, testRecipes } from './models/recipe';
import { RecipeCard } from './recipe-card/recipe-card';
import { RecipeEditForm } from './recipe-edit-form/recipe-edit-form';
import { RecipeThumbnail } from './recipe-thumbnail/recipe-thumbnail';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RecipeCard, RecipeThumbnail],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('recipes');
  testEmptyRecipe = emptyRecipe;
  recipes = signal<Recipe[]>(testRecipes);
  openedRecipe!: Recipe;
  recipeIsOpened!: boolean

  ngOnInit() {
    this.recipes.set(testRecipes);
    this.openedRecipe = emptyRecipe;
    this.recipeIsOpened = false;
  }

  onClick(recipe: Recipe) {
    this.recipeIsOpened = true;
    this.openedRecipe = recipe;
  }

  updateRecipe(newRecipe: Recipe) {
    this.recipes.update(arr =>
      arr.map(r => r.id === newRecipe.id ? newRecipe : r)
    );
    // reset openedRecipe to updated value
    this.openedRecipe = this.recipes().find(r => r.id === newRecipe.id)!;
  }
}