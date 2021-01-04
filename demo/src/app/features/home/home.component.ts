import { Component } from "@angular/core";
import { NavigationService } from "@app-core";

@Component({
    selector: "ns-home",
    templateUrl: "./home.component.html",
})
export class HomeComponent {
    navigationOptions: { text: string; url: string }[] = [
        { text: "Pinch To Zoom", url: "/image-zoom" },
        { text: "RTL Layouts", url: "/rtl-layouts" },
    ];

    constructor(private navigationService: NavigationService) {}

    navigateTo(url: string): void {
        this.navigationService.navigateTo(url);
    }
}
