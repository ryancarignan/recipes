import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Recipe, Section, Ingredient, emptyRecipe, testRecipes } from './models/recipe';
import { RecipeCard } from './recipe-card/recipe-card';
import { RecipeEditForm } from './recipe-edit-form/recipe-edit-form';
import { RecipeThumbnail } from './recipe-thumbnail/recipe-thumbnail';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RecipeCard, RecipeEditForm, RecipeThumbnail],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('recipes');
  testEmptyRecipe = emptyRecipe;
  testRecipe: Recipe = {
    id: 0,
    name: "Apple Pie",
    rating: 4.2,
    image: "apple-pie-image.jpg",
    sections: [
      {
        name: "Crust",
        ingredients: [
          {
            name: "Pie Crust",
            unit: "package",
            quantity: 1
          }
        ],
        directions: [
          "Let crust get to room temperature",
          "Roll out crust onto a created pie plate"
        ]
      },
      {
        name: "Filling",
        ingredients: [
          {
            name: "apples",
            unit: "",
            quantity: 5
          },
          {
            name: "granulated sugar",
            unit: "cups",
            quantity: 0.5
          },
          {
            name: "packed brown sugar",
            unit: "cups",
            quantity: 0.5
          },
          {
            name: "cinnamon",
            unit: "teaspoon",
            quantity: 2
          }
        ],
        directions: [
          "Slice apples",
          "In a large bowl, combine apples and dry ingredients"
        ]
      }
    ]
  }
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