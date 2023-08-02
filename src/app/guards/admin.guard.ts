import { Injectable } from "@angular/core";
import { ActivatedRoute, CanActivate, Router } from "@angular/router";
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private route: ActivatedRoute) { }

  canActivate(): Observable<boolean> {
    if (localStorage.getItem('role') === 'admin') {
      return of(true);
    }
    else {
      alert('You didnot have an primsiion to access this page');
      return of(false);
    }

  }
}