import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { SharedModule } from "@app-shared";
import { ImageZoomRoutingModule } from "./image-zoom-routing.module";
import { ImageZoomComponent } from "./image-zoom.component";
import { PinchToZoomDirective } from "./pinch-to-zoom.directive";

@NgModule({
    imports: [NativeScriptCommonModule, SharedModule, ImageZoomRoutingModule],
    declarations: [ImageZoomComponent, PinchToZoomDirective],
    schemas: [NO_ERRORS_SCHEMA],
})
export class ImageZoomModule {}
