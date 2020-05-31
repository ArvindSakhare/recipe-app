import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService{
    recipeChanged = new Subject<Recipe[]>();
    recipes: Recipe[] = [
        new Recipe('A Pizza', 
        'This is Pizza recipe', 
        'https://www.biggerbolderbaking.com/wp-content/uploads/2019/07/15-Minute-Pizza-WS-Thumbnail.png',
         [
             new Ingredient('Beans', 10),
             new Ingredient('Cheese', 2)
         ]   
        ),
        new Recipe('A Big Fat Burger', 
        'This is A Big Fat Burger  recipe', 
        'https://media1.s-nbcnews.com/j/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p_d9270c5c545b30ea094084c7f2342eb4.fit-760w.jpg',
        [
            new Ingredient('Buns', 5),
            new Ingredient('French fries', 20)
        ]    
        )];

    constructor(private slService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addRecipe(newRecipe: Recipe){
        this.recipes.push(newRecipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
}