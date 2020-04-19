export interface TableIngredient {
    name: string;
    quantity: string;
    unit: string;
}

export interface TableRecipe {
    name: string;
    calories: Number;
}

export interface TableState {
    select: (selectionStatus: boolean) => void;
    isSelected: boolean;
}