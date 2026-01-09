import { Component, EventEmitter, input, model, OnInit, Output } from '@angular/core';
import { emptyRecipe, Recipe } from '../models/recipe';
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
  @Output() update = new EventEmitter<Recipe>();

  ngOnInit() {
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
  forwardUpdate(updatedRecipe: Recipe) {
    this.update.emit(updatedRecipe);
  }

  close() {
    this.beingEdited = false;
    this.recipeIsOpened.set(false);
  }
}