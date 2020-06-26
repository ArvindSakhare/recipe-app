import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    isLoginMode = true;
    error = null;
    isLoading = false;

    constructor(private authService: AuthService, private router:Router) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;

        let authObs: Observable<AuthResponseData>;

        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(responseData => {
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            this.isLoading = false;
            this.error = errorMessage;
        });

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

}