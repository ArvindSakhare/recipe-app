import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
    recipes: Recipe[] = [
        new Recipe('A Pizza', 
        'This is test recipe', 
        'https://www.biggerbolderbaking.com/wp-content/uploads/2019/07/15-Minute-Pizza-WS-Thumbnail.png',
         [
             new Ingredient('Beans', 10)
         ]   
        ),
        new Recipe('Another Test Recipe', 
        'This is Another recipe', 
        'https://www.biggerbolderbaking.com/wp-content/uploads/2019/07/15-Minute-Pizza-WS-Thumbnail.png',
        [
            new Ingredient('Buns', 5),
            new Ingredient('French fries', 20)
        ]    
        )];

    constructor(private slService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
}