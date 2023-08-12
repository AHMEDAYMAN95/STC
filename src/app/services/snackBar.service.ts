import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    constructor(private snackBar: MatSnackBar) { }

    openSnackBar(message: string, cssClass?: string) {
        const snackBarConfig: MatSnackBarConfig<any> = {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
        };

        if (cssClass) {
            snackBarConfig['panelClass'] = [cssClass];
        }
        this.snackBar.open(message, 'close', snackBarConfig);
    }
}
