import { Component } from '@angular/core';
import { DataStoreService } from '../shared/data-store.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    constructor(private dataStoreService: DataStoreService) {}

    onSaveData(){
        this.dataStoreService.storeRecipes();
    }
    onFetchData(){
        this.dataStoreService.fetchRecipes().subscribe();
    }
}