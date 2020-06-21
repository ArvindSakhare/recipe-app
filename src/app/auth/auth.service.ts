import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { AppSettings } from '../shared/app-settings';
import { User } from './user.model';

export interface AuthResponseData {
    email: string,
    expiresIn: string,
    idToken: string,
    kind: string,
    localId: string,
    refreshToken: string,
    registered?: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new Subject<User>();

    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + AppSettings.API_KEY,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + AppSettings.API_KEY,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error occured";

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
                errorMessage = "Incorrect email ID";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "Incorrect Password please try again";
                break;
            case 'EMAIL_EXISTS':
                errorMessage = "Email ID Already exists";
                break;
        }

        return throwError(errorMessage);
    }
}