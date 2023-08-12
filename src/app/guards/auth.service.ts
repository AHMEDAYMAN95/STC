import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/userModel';
import { SnackBarService } from '../services/snackBar.service';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    authUsers: User[] = [
        { userName: 'user', password: 'user', permissions: ['user'] },
        { userName: 'admin', password: 'admin', permissions: ['admin'] },
    ];

    public user = new BehaviorSubject<User | null>(null);

    constructor(
        private router: Router,
        private snackBarService: SnackBarService
    ) { }

    get isUserAuthenticated() {
        return this.user.value != null;
    }

    checkUserAuth(loggedUser: User) {
        let isFound = false;
        let foundUser: User = { userName: '', password: '', permissions: [] };
        this.authUsers.forEach((user) => {
            if (
                loggedUser.userName == user.userName &&
                loggedUser.password == user.password
            ) {
                foundUser = user;
                isFound = true;
            }
        });
        return {
            user: foundUser,
            isFound,
        };
    }

    signIn(user: User) {
        if (this.checkUserAuth(user).isFound) {
            const foundUser: User = this.checkUserAuth(user).user;

            this.handleAuthentication(foundUser as unknown as User);
            if (foundUser.permissions.includes('admin')) {
                this.router.navigate(['/stc-product/product']);
            } else if (foundUser.permissions.includes('user')) {
                this.router.navigate(['/stc-categories/categories']);
            }
        } else {
            this.snackBarService.openSnackBar('Wrong login Cridentials');
            return;
        }
    }

    handleAuthentication(user: User) {
        localStorage.setItem('userData', JSON.stringify(user));
        this.user.next(user);
        this.snackBarService.openSnackBar('Signed in Succesfully');
    }

    autoLogin() {
        let userData: any = localStorage.getItem('userData');
        userData = JSON.parse(userData);

        if (!userData) {
            return;
        } else {
            this.user.next(userData);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
    }
}
