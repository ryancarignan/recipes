import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Recipe, Section, Ingredient, emptyRecipe, testRecipes } from './models/recipe';
import { RecipeCard } from './recipe-card/recipe-card';
import { RecipeThumbnail } from './recipe-thumbnail/recipe-thumbnail';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RecipeCard, RecipeThumbnail],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('recipes');
  recipes = signal<Recipe[]>(testRecipes);
  openedRecipe!: Recipe;
  recipeIsOpened!: boolean
  idCounter!: number; // NOTE only used for local ids, can be removed when backend sets ids

  ngOnInit() {
    this.recipes.set(testRecipes);
    this.openedRecipe = emptyRecipe;
    this.recipeIsOpened = false;
    this.idCounter = this.recipes().length + 1;
  }

  onClick(recipe: Recipe) {
    this.recipeIsOpened = true;
    this.openedRecipe = recipe;
  }

  updateRecipe(newRecipe: Recipe | null) {
    if (newRecipe === null) {
      this.recipes.update(arr => 
        arr.filter(r => r !== this.openedRecipe)
      );
      // close recipe card
      this.recipeIsOpened = false;
    } else {
      this.recipes.update(arr =>
        arr.map(r => (r.id === newRecipe.id) ? newRecipe : r)
      );
      // reset openedRecipe to updated value
      this.openedRecipe = this.recipes().find(r => r.id === newRecipe.id)!;
    }
  }

  addNewRecipe() {
    const newRecipe = structuredClone(emptyRecipe);
    newRecipe.id = this.idCounter++; // NOTE should be handled by backend when that is added
    this.recipes.update(recipes => [...recipes, newRecipe]);
    this.openedRecipe = newRecipe;
    this.recipeIsOpened = true;
  }
}