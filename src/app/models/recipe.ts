export interface Recipe {
  name: string;
  rating: number;
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