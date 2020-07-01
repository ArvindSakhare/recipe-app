import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(
    private slService: ShoppingListService, 
    private store: Store<{ shoppingList: {ingredients: Ingredient[]}}> ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.igChangeSub = this.slService.ingredientChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //        this.ingredients = ingredients;
    // });
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(){
    //this.igChangeSub.unsubscribe();
  }

}
