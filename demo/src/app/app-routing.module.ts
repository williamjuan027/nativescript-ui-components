import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    {
        path: "home",
        loadChildren: () =>
            import("./features/home/home.module").then((m) => m.HomeModule),
    },
    {
        path: "image-zoom",
        loadChildren: () =>
            import("./features/image-zoom/image-zoom.module").then(
                (m) => m.ImageZoomModule
            ),
    },
    {
        path: "rtl-layouts",
        loadChildren: () =>
            import("./features/rtl-layouts/rtl-layouts.module").then(
                (m) => m.RtlLayoutsModule
            ),
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
