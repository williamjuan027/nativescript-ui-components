import { Component } from "@angular/core";

@Component({
    selector: "ns-rtl-layouts",
    templateUrl: "./rtl-layouts.component.html",
})
export class RtlLayoutsComponent {
    isRtl = false;

    toggleRtl(): void {
        this.isRtl = !this.isRtl;
    }
}
