import { Injectable } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

@Injectable({
    providedIn: "root",
})
export class NavigationService {
    constructor(private router: RouterExtensions) {}

    navigateTo(url: string): void {
        this.router.navigate([url]);
    }

    back(): void {
        if (this.router.canGoBack()) {
            this.router.back();
        }
    }
}
