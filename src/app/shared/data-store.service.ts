import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators'

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DataStoreService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put("https://angular-recipes-5c5df.firebaseio.com/recipe.json?key="+ process.env.FIREBASE_API_KEY
        , recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
            "https://angular-recipes-5c5df.firebaseio.com/recipe.json?key="+ process.env.FIREBASE_API_KEY
        ).pipe(
            map(recipes => {
                return recipes.map(recipes => {
                    return {
                        ...recipes,
                        ingredients: recipes.ingredients ? recipes.ingredients : []
                    };
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        )

    }

}