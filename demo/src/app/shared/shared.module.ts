import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
    NativeScriptAnimationsModule,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
} from "@nativescript/angular";
import { COMPONENTS } from "./components";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptAnimationsModule,
    ],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    schemas: [NO_ERRORS_SCHEMA],
})
export class SharedModule {}
