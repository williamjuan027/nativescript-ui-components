import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { RtlLayoutsComponent } from "./rtl-layouts.component";

export const routes: Routes = [
    {
        path: "",
        component: RtlLayoutsComponent,
    },
];
@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],
})
export class RtlLayoutsRoutingModule {}
