# Snapping Stepper

![Screenshot](https://github.com/williamjuan027/nativescript-ui-components/blob/master/screenshots/snapping-stepper.gif)

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
| --------------------- | :-------: | :---: | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| width | :white_check_mark: | :white_check_mark: | Sets the width of the stepper | Required |
| height | :white_check_mark: | :white_check_mark: | Sets the height of the stepper | Required |
| limitLower | :white_check_mark: | :white_check_mark: | Sets the lower limit of the count | Required |
| limitHigher | :white_check_mark: | :white_check_mark: | Sets the higher limit of the count | Required |
| startingNum | :white_check_mark: | :white_check_mark: | Sets the initial value of the count | Optional (Defaults to the `limitLower`) |
| backgroundColor | :white_check_mark: | :white_check_mark: | Sets the background color of the stepper | Optional (Defaults to white) |
| textColor | :white_check_mark: | :white_check_mark: | Sets the text color of the positive and negative buttons | Optional (Defaults to black) |
| focusBackgroundColor | :white_check_mark: | :white_check_mark: | Sets the background color of the middle section containing the count | Optional (Defaults to white) |
| focusTextColor | :white_check_mark: | :white_check_mark: | Sets the text color of the count | Optional (Defaults to black) |
| valueChange | :white_check_mark: | :white_check_mark: | Emits the current count | |
