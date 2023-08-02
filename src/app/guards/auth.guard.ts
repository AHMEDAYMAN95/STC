import { Injectable } from "@angular/core";
import { ActivatedRoute, CanActivate, Router } from "@angular/router";
import { Observable, of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private route: ActivatedRoute) { }

    canActivate(): Observable<boolean> {
        if (localStorage.getItem('role') === 'user') {
            return of(true);
        }
        else {
            alert('You didnot have an primsiion to access this page');
            return of(false);
        }

    }
}