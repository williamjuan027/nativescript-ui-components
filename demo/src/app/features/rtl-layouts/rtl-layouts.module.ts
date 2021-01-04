import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { SharedModule } from "@app-shared";
import { RtlLayoutsRoutingModule } from "./rtl-layouts-routing.module";
import { RtlLayoutsComponent } from "./rtl-layouts.component";

@NgModule({
    imports: [NativeScriptCommonModule, SharedModule, RtlLayoutsRoutingModule],
    declarations: [RtlLayoutsComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class RtlLayoutsModule {}
