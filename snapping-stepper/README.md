# Snapping Stepper

// TODO: add image or gif and document apis  
// TODO: add type and refactor required/optional, split event emitters from properties?  

## Usage
```ts
import { SnappingStepperModule } from './snapping-stepper/snapping-stepper.module';
import { StepperConfig } from './snapping-stepper/snapping-stepper/stepper-config';

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
<app-snapping-stepper [stepperConfig]="stepperConfig" (valueChange)="onStepperValueChange($event)"></app-snapping-stepper>
```

## API

| Property              | Android | iOS | Description                                                                    | Note                                                                                                 |
| --------------------- | ------- | --- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| width | X | X | Sets the width of the stepper | Required |
| height | X | X | Sets the height of the stepper | Required |
| limitLower | X | X | Sets the lower limit of the count | Required |
| limitHigher | X | X | Sets the higher limit of the count | Required |
| startingNum | X | X | Sets the initial value of the count | Optional (Defaults to the `limitLower`) |
| backgroundColor | X | X | Sets the background color of the stepper | Optional (Defaults to white) |
| textColor | X | X | Sets the text color of the positive and negative buttons | Optional (Defaults to black) |
| focusBackgroundColor | X | X | Sets the background color of the middle section containing the count | Optional (Defaults to white) |
| focusTextColor | X | X | Sets the text color of the count | Optional (Defaults to black) |
| valueChange | X | X | Emits the current count | |
