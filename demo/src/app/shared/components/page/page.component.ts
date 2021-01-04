import { Component, Input } from "@angular/core";
import { Page } from "@nativescript/core";

@Component({
    selector: "ns-page",
    templateUrl: "./page.component.html",
})
export class PageComponent {
    @Input() header?: {
        title?: string;
        description?: string;
        backEnabled?: boolean;
    };

    constructor(private page: Page) {
        page.actionBarHidden = true;
    }
}
