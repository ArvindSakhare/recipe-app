import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';


export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
    recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is test recipe', 'https://www.biggerbolderbaking.com/wp-content/uploads/2019/07/15-Minute-Pizza-WS-Thumbnail.png'    
        ),
        new Recipe('Another Test Recipe', 'This is Another recipe', 'https://www.biggerbolderbaking.com/wp-content/uploads/2019/07/15-Minute-Pizza-WS-Thumbnail.png'    
        )];

    getRecipes(){
        return this.recipes.slice();
    }
}