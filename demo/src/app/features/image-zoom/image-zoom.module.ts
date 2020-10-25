import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ImageZoomRoutingModule } from './image-zoom-routing.module';
import { ImageZoomComponent } from './image-zoom.component';
import { PinchToZoomDirective } from './pinch-to-zoom.directive';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    ImageZoomRoutingModule
  ],
  declarations: [
    ImageZoomComponent,
    PinchToZoomDirective
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ImageZoomModule {}
