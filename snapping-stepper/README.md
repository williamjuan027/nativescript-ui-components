# Snapping Stepper

<img src="https://github.com/williamjuan027/nativescript-ui-components/blob/master/screenshots/snapping-stepper.gif" width="200">

Read the complete tutorial [here](https://nativescripting.com/posts/snapping-stepper-tutorial) and checkout out the playground demo [here](https://play.nativescript.org/?template=play-ng&id=6wCQbR&v=1).

## Usage
Import `SnappingStepperModule` in the module you want to use it  
```ts
// .module.ts
import { SnappingStepperModule } from './snapping-stepper/snapping-stepper.module';
```

Import `StepperConfig` interface to define the properties of the stepper and pass it to the snapping-stepper component as `stepperConfig`  
```ts
// .component.ts
import { StepperConfig } from './snapping-stepper/stepper-config';

stepperConfig: StepperConfig = {
  width: 100,
  height: 100,
  limitLower: 0,
  limitHigher: 100,
  startingNum: 50,
  backgroundColor: '#dd00ff',
  textColor: '#000000'
}
```  

```html
<!-- .component.html -->
<app-snapping-stepper [stepperConfig]="stepperConfig" (valueChange)="onStepperValueChange($event)"></app-snapping-stepper>
```

## Properties

| Property              | Description                                                                    | Type | Default                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | --------- |
| width | Sets the width of the stepper | number | 150 |
| height | Sets the height of the stepper | number | 50 |
| limitLower | Sets the lower limit of the count | number | 0 |
| limitHigher | Sets the higher limit of the count | number | 100 |
| startingNum | Sets the initial value of the count | number | 50 |
| backgroundColor | Sets the background color of the stepper | string | '#1976d2' |
| textColor | Sets the text color of the positive and negative buttons | string | '#ffffff' |
| focusBackgroundColor | Sets the background color of the middle section containing the count | string | '#2196f3' |
| focusTextColor | Sets the text color of the count | string | '#ffffff'' |
| (valueChange) | Emits the current count | number | |
