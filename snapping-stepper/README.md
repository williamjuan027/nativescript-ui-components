# Snapping Stepper

// TODO: add image or gif and document apis
// TODO: add type and refactor required/optional, split event emitters from properties?

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
