# Bottombar

<img src="https://github.com/williamjuan027/nativescript-ui-components/blob/master/screenshots/bottombar-sliding-color.gif" width="200">

Checkout the playground demo [here](https://play.nativescript.org/?template=play-ng&id=Ej8qI6&v=25)

## Usage
Import `BottombarSlidingColorModule` in the module you want to use it

```ts
// .module.ts
import { BottombarSlidingColorModule } from './bottombar/bottombar.module';
```  

Import `Tabs` interface to define the properties of the each tab and pass it to the bottombar component as `tabs` and `BottombarSlidingColorConfig` interface to define the styling of the bottombar and pass it in as `config`.  

```ts
// .component.ts
import { Tabs, BottombarSlidingColorConfig } from "./bottombar-sliding-color/bottombar-sliding-color-config";

tabs: Tabs = [
  { image: 'path/to/image', text: 'Home', backgroundColor: "#7B6BE7" },
  { image: 'path/to/image', text: 'Notifications', backgroundColor: "#5A73DD" },
  { image: 'path/to/image', text: 'Profile', backgroundColor: "#6CDFDF" },
  ...
];

bottombarConfig: BottombarSlidingColorConfig = {
  height: 80,
  backgroundColor: '#10101F'
};
```  

```html
<!-- .component.html -->
<app-bottombar-sliding-color [tabs]=" tabs" [selectedIndex]="0"
    [config]="bottombarConfig"
    (selectedIndexChange)="onTabIndexChange($event)">
</app-bottombar-sliding-color>
```  

## Properties

| Property              | Description                                                                    | Type | Default                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | --------- |
| tabs.image | set the images of the tab | string | '' |
| tabs.test | set the text of the tab | string | '' |
| tabs.backgroundColor | set the background color of the tab | string | '' |
| selectedIndex | Sets the default selected index | number | 0 |
| config.height | Sets the height of the bottombar | number | 60 |
| config.backgroundColor | Sets the background color of the bottombar | string | #0D0D12 |
| (selectedIndexChange) | Emits the new selected index | number |  |
