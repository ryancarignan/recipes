import { Component, OnInit, input } from '@angular/core';
import { Recipe } from '../models/recipe'

@Component({
  selector: 'app-recipe-thumbnail',
  imports: [],
  templateUrl: './recipe-thumbnail.html',
  styleUrl: './recipe-thumbnail.scss',
})
export class RecipeThumbnail implements OnInit {
  recipe = input.required<Recipe>();
  imageError!: boolean;

  ngOnInit() {
    this.imageError = false;
  }

  onImageError() {
    this.imageError = true;
  }

  onImageLoad() {
    this.imageError = false;
  }
}
