import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackBarService } from '../services/snackBar.service';


export const permissionGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const snackBarService: SnackBarService = inject(SnackBarService);
  let hasPermssion: boolean = false;

  authService.user.subscribe((user) => {
    if (user?.permissions.includes(route.data['permissions'])) {
      hasPermssion = true;
    } else {
      hasPermssion = false;
      snackBarService.openSnackBar(
        'You dont have permssion to access this page'
      );
    }
  });
  return hasPermssion;
};
