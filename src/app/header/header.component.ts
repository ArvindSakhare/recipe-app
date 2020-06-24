import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStoreService } from '../shared/data-store.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    constructor(private dataStoreService: DataStoreService, private authService: AuthService) {}
    userSub : Subscription;
    isAuthenticated: boolean;

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    onSaveData() {
        this.dataStoreService.storeRecipes();
    }
    onFetchData() {
        this.dataStoreService.fetchRecipes().subscribe();
    }
    onLogout() {
        this.authService.logout();
    }
    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}