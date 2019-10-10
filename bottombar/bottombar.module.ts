import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { BottombarComponent } from "./bottombar.component";

@NgModule({
	imports: [
		NativeScriptCommonModule
	],
	declarations: [
		BottombarComponent
	],
	exports: [
		BottombarComponent
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class BottombarModule { }
