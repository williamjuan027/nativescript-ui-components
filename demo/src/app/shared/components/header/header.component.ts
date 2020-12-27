import { Component, Input } from "@angular/core";
import { NavigationService } from "@app-core";

@Component({
    selector: "ns-header",
    templateUrl: "./header.component.html",
})
export class HeaderComponent {
    @Input() title: string = "";
    @Input() description: string = "";
    @Input() backEnabled: boolean = true;

    constructor(private navigationService: NavigationService) {}

    back(): void {
        this.navigationService.back();
    }
}
