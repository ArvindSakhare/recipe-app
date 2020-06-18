import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({providedIn: 'root'})
export class DataStoreService {
    constructor(private http:HttpClient, private recipeService: RecipeService) {}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put("https://angular-recipes-5c5df.firebaseio.com/recipe.json",recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes(){
        const recipes = this.http.get<Recipe[]>("https://angular-recipes-5c5df.firebaseio.com/recipe.json")
        .pipe(map(recipes => {
            return recipes.map(recipes => {
                return { ...recipes, ingredients: recipes.ingredients ? recipes.ingredients : [] };
            })
        }))
        .subscribe(recipes => {
            this.recipeService.setRecipes(recipes);          
        });              
    }

}