export interface Unit {
    name: string;
}

export interface Ingredient {
    name: string;
    attributes: IngredientAttribute[];
}

export interface IngredientAttribute {
    calories: number;
    unit?: Unit;
}

export interface RecipeIngredient {
    quantity: string;
    unit?: Unit;
    ingredient: Ingredient;
}

export interface Recipe {
    name: string;
    ingredients: RecipeIngredient[];
}
