<template>
  <Layout>
    <v-row>
      <v-col cols="12" md="8">
        <h1>Hi there!</h1>
        <p>You can find all your recipes below. As you select them, we'll compile a shopping list for you.</p>
        <v-data-table 
          v-model="recipeSelected" 
          :headers="recipeHeaders" 
          :items="displayedRecipes()" 
          class="elevation-5" 
          item-key="name" 
          show-select
          disable-sort
          mobile-breakpoint="1"
        />
      </v-col>
      <v-col v-if="displayedIngredients().length > 0" cols="12" md="4">
        <h1>Your shopping list</h1>
        <v-data-table 
          v-model="ingredientSelected" 
          :headers="ingredientHeaders" 
          :items="displayedIngredients()" 
          item-key="name" 
          :items-per-page="15" 
          class="elevation-5"
          show-select
          disable-sort
          mobile-breakpoint="1"
        />
      </v-col>
    </v-row>
  </Layout>
</template>

<script lang="ts">
var convert = require('convert-units')
var fracty = require('fracty')

import { Recipe, Ingredient } from '../types'
import { TableRecipe, TableIngredient } from '../model'

export default {
  data() {
    return {
      ingredientSelected: [],
      recipeSelected: [],
      ingredientHeaders: [
        {
          text: 'Item',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Measure', value: 'unit' }
      ],
      recipeHeaders: [
        {
          text: 'Recipe',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' }
      ]
    }
  },
  metaInfo: {
    title: 'Meal Planning'
  },
  methods: {
    displayedIngredients(): TableIngredient[] {
      const selectedRecipes = this.recipes().filter((recipe: Recipe) => 
        (this as any).recipeSelected.map((selected: Recipe) => selected.name).includes(recipe.name)
      )
      let ingredients: { [key: string]: any } = {}
      selectedRecipes.forEach((recipe: Recipe) => {
        recipe.ingredients.forEach(ingredientQuantity => {
          let currentIngredient = ingredients[ingredientQuantity.ingredient.name]
          if (!currentIngredient) {
            ingredients[ingredientQuantity.ingredient.name] = currentIngredient = 
              { unit: ingredientQuantity.unit ? ingredientQuantity.unit.name : null, quantity: 0 }
          }
          currentIngredient.quantity += this.parseQuantity(ingredientQuantity.quantity)
        })
      })

      return Object.keys(ingredients).map((key) => {
        return {name: key, quantity: fracty(ingredients[key].quantity), unit: ingredients[key].unit}
      })
    },
    displayedRecipes(): TableRecipe[] {
      return this.recipes().map((recipe: Recipe) => {
        return {
          name: recipe.name,
          calories: Math.round(this.recipeCalories(recipe))
        }
      })
    },
    recipes(): Recipe[] {
      return (this as any).$static.queriedRecipes.edges.map((edge: any) => edge.node)
    },
    recipeCalories(recipe: Recipe): number {
      return recipe.ingredients.reduce((accumulator, currentValue) => 
        accumulator + this.ingredientCalories(currentValue.ingredient, currentValue.unit ? currentValue.unit.name : undefined)
          * this.parseQuantity(currentValue.quantity), 0
      )
    },
    ingredientCalories(ingredient: Ingredient, desiredUnit?: string): number {
      if (desiredUnit == undefined) {
        const discreteAttribute = ingredient.attributes.find((attribute) => attribute.unit == null)
        if (discreteAttribute) {
          return discreteAttribute.calories
        }
      }

      const convertibleAttribute = ingredient.attributes.find((attribute) => {
        return attribute.unit && convert().from(attribute.unit.name).possibilities().filter((possibility: string) => 
          possibility === desiredUnit
        ).length > 0
      })
      if (convertibleAttribute) {
        return convert(convertibleAttribute.calories).from(convertibleAttribute.unit!.name).to(desiredUnit)
      }
      return 0
    },
    parseQuantity(quantity: string): number {
      if (quantity.includes('/')) {
        const operands: string[] = quantity.split('/')
        return parseInt(operands[0]) / parseInt(operands[1])
      }
      return parseInt(quantity)
    }
  }
}
</script>

<style>
</style>

<static-query>
query {
  queriedRecipes: allRecipe {
    edges{
      node{
        id
        ingredients {
          quantity
          unit {
            name
          }
          ingredient {
            name
            attributes{
              calories
              unit {
                name
              }
            }
          }
        }
        name
      }
    }
  }
}
</static-query>