import { Component, input, model, OnInit } from '@angular/core';
import { emptyRecipe, Recipe } from '../models/recipe';
import { RecipeEditForm } from '../recipe-edit-form/recipe-edit-form';

@Component({
  selector: 'app-recipe-card',
  imports: [RecipeEditForm],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
})
export class RecipeCard implements OnInit {
  recipe = model<Recipe>(emptyRecipe);
  recipeIsOpened = model<boolean>(false);
  beingEdited!: boolean;
  imageError!: boolean;

  ngOnInit() {
    this.beingEdited = false;
    this.imageError = false;
  }

  editRecipe() {
    this.beingEdited = true;
  }

  onImageError() {
    this.imageError = true;
  }

  onImageLoad() {
    this.imageError = false;
  }

  close() {
    this.beingEdited = false;
    this.recipeIsOpened.set(false);
  }
}