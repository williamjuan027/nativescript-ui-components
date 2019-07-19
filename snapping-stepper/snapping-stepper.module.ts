import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SnappingStepperComponent } from "./snapping-stepper.component";

@NgModule({
	imports: [
		NativeScriptCommonModule,
		NativeScriptFormsModule
	],
	declarations: [
		SnappingStepperComponent
	],
	exports: [
		SnappingStepperComponent
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class SnappingStepperModule { }
