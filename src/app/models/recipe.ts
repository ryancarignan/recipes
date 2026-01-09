export interface Recipe {
  id: number;
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

/**
 * Performs a deep equality check on a pair of Recipes
 * @param r1 a Recipe to compare
 * @param r2 a Recipe to compare
 * @param compareIds if the ids should be considered in the comparison
 * @returns if the Recipes are equal
 */
export function compareRecipes(r1: Recipe, r2: Recipe, compareIds: boolean): boolean {
  return (
    (!compareIds || r1.id === r2.id) && // id
    r1.name === r2.name &&
    r1.image === r2.image &&
    r1.rating === r2.rating &&
    r1.sections.length === r2.sections.length &&
    r1.sections.map((s1, i) => { // sections
      const s2 = r2.sections[i];
      return s1.name === s2.name && // name
      s1.ingredients.map((i1, i) => { // ingredients
        const i2 = s2.ingredients[i];
        return (
          i1.name === i2.name &&
          i1.quantity === i2.quantity &&
          i1.unit === i2.unit
        );
      }).every(Boolean) &&
      s1.directions.map((d1, i) => { // directions
        const d2 = s2.directions[i];
        return (d1 === d2);
      }).every(Boolean);
    }).every(Boolean)
  );
}

export const emptyRecipe: Recipe = {
  id: -1, // TODO should be set when created
  name: "",
  rating: 0,
  sections: []
}

export const testRecipes: Recipe[] = [
  {
    id: 1,
    name: "Classic Pancakes",
    rating: 4.5,
    image: "pancakes-image.webp",
    sections: [
      {
        name: "Batter",
        ingredients: [
          { name: "All-purpose flour", unit: "cup", quantity: 1.5 },
          { name: "Milk", unit: "cup", quantity: 1.25 },
          { name: "Egg", unit: "piece", quantity: 1 },
          { name: "Baking powder", unit: "tsp", quantity: 3 },
          { name: "Salt", unit: "tsp", quantity: 0.5 }
        ],
        directions: [
          "Whisk all dry ingredients together.",
          "Add milk and egg, then mix until just combined.",
          "Let the batter rest for 5 minutes."
        ]
      },
      {
        name: "Cooking",
        ingredients: [
          { name: "Butter", unit: "tbsp", quantity: 1 }
        ],
        directions: [
          "Heat a pan over medium heat and melt butter.",
          "Pour batter onto the pan.",
          "Cook until bubbles form, flip, and cook until golden."
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Spaghetti Bolognese",
    rating: 4.8,
    image: "spaghetti-image.jpg",
    sections: [
      {
        name: "Sauce",
        ingredients: [
          { name: "Ground beef", unit: "g", quantity: 500 },
          { name: "Onion", unit: "piece", quantity: 1 },
          { name: "Garlic", unit: "clove", quantity: 2 },
          { name: "Tomato sauce", unit: "cup", quantity: 2 }
        ],
        directions: [
          "Sauté onion and garlic until fragrant.",
          "Add ground beef and cook until browned.",
          "Stir in tomato sauce and simmer for 20 minutes."
        ]
      },
      {
        name: "Pasta",
        ingredients: [
          { name: "Spaghetti", unit: "g", quantity: 400 },
          { name: "Salt", unit: "tbsp", quantity: 1 }
        ],
        directions: [
          "Boil water with salt.",
          "Cook spaghetti according to package instructions.",
          "Drain and combine with sauce."
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Caesar Salad",
    rating: 4.2,
    sections: [
      {
        name: "Salad",
        ingredients: [
          { name: "Romaine lettuce", unit: "head", quantity: 1 },
          { name: "Croutons", unit: "cup", quantity: 1 },
          { name: "Parmesan cheese", unit: "g", quantity: 50 }
        ],
        directions: [
          "Wash and chop the lettuce.",
          "Add croutons and grated parmesan.",
          "Toss gently."
        ]
      },
      {
        name: "Dressing",
        ingredients: [
          { name: "Olive oil", unit: "tbsp", quantity: 3 },
          { name: "Lemon juice", unit: "tbsp", quantity: 2 },
          { name: "Garlic", unit: "clove", quantity: 1 }
        ],
        directions: [
          "Whisk olive oil and lemon juice together.",
          "Add minced garlic.",
          "Drizzle over salad before serving."
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Chicken Stir Fry",
    rating: 4.6,
    image: "chicken-stir-fry-image.jpg",
    sections: [
      {
        name: "Stir Fry",
        ingredients: [
          { name: "Chicken breast", unit: "g", quantity: 400 },
          { name: "Bell pepper", unit: "piece", quantity: 1 },
          { name: "Broccoli", unit: "cup", quantity: 1.5 },
          { name: "Soy sauce", unit: "tbsp", quantity: 3 }
        ],
        directions: [
          "Slice chicken and vegetables.",
          "Heat oil in a wok over high heat.",
          "Cook chicken, add vegetables, then stir in soy sauce."
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Chocolate Chip Cookies",
    rating: 4.9,
    sections: [
      {
        name: "Cookie Dough",
        ingredients: [
          { name: "Butter", unit: "cup", quantity: 1 },
          { name: "Sugar", unit: "cup", quantity: 0.75 },
          { name: "Brown sugar", unit: "cup", quantity: 0.75 },
          { name: "Flour", unit: "cup", quantity: 2.25 },
          { name: "Chocolate chips", unit: "cup", quantity: 2 }
        ],
        directions: [
          "Cream butter and sugars together.",
          "Mix in flour until combined.",
          "Fold in chocolate chips."
        ]
      },
      {
        name: "Baking",
        ingredients: [],
        directions: [
          "Preheat oven to 180°C (350°F).",
          "Scoop dough onto baking sheet.",
          "Bake for 10–12 minutes until golden."
        ]
      }
    ]
  }
];