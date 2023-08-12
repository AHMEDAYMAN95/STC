import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    private isLoading$ = new BehaviorSubject<boolean>(false);

    constructor() { }

    get isLoading() {
        return this.isLoading$.value;
    }

    set isLoading(isLoadingVal: boolean) {
        // Disable or Enable scrolling on the body
        isLoadingVal
            ? (document.body.style.overflow = 'hidden')
            : (document.body.style.overflow = '');
        this.isLoading$.next(isLoadingVal);
    }
}
