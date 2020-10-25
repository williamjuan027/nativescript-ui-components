import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { ImageZoomComponent } from './image-zoom.component';

export const routes: Routes = [
  {
    path: '',
    component: ImageZoomComponent,
  },
];
@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ImageZoomRoutingModule { }
