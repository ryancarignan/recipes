export interface Recipe {
  name: string;
  rating: number;
  image?: string;
  sections: Section[];
}

export interface Section {
  name: string;
  ingredients: Ingredient[];
  directions: string[];
}

export interface Ingredient {
  name: string;
  unit: string;
  quantity: number;
}

export const emptyRecipe: Recipe = {
  name: "",
  rating: 0,
  sections: []
}