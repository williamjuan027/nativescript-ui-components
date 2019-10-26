import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { BottombarSlidingColorComponent } from "./bottombar-sliding-color.component";

@NgModule({
	imports: [
		NativeScriptCommonModule
	],
	declarations: [
		BottombarSlidingColorComponent
	],
	exports: [
		BottombarSlidingColorComponent
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class BottombarSlidingColorModule { }
