import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

const routes: Routes = [
    { path: "", redirectTo: "/image-zoom", pathMatch: "full" },
    { path: "image-zoom", loadChildren:
        () => import('./features/image-zoom/image-zoom.module').then(
          (m) => m.ImageZoomModule
        )
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
