# Bottombar

<img src="https://github.com/williamjuan027/nativescript-ui-components/blob/master/screenshots/bottombar.gif" width="200">

Checkout the playground demo [here](https://play.nativescript.org/?template=play-ng&id=Kbsn9Z&v=10)

## Usage
Import `BottombarModule` in the module you want to use it

```ts
// .module.ts
import { BottombarModule } from './bottombar/bottombar.module';
```  

Import `Tabs` interface to define the properties of the each tab and pass it to the bottombar component as `tabs` and `BottombarConfig` interface to define the styling of the bottombar and pass it in as `config`.  

```ts
// .component.ts
import { Tabs, BottombarConfig } from './bottombar/bottombar-config';

tabs: TabsConfig = [
  { image: 'path/to/image' },
  { image: 'path/to/image' },
  { image: 'path/to/image' },
  ...
];

bottombarConfig: BottombarConfig = {
  height: 60,
  backgroundColor: '#0D0D12',
  highlightColor: '#F8A200'
};
```  

```html
<!-- .component.html -->
<app-bottombar [tabs]="tabs" [selectedIndex]="0" [config]="bottombarConfig"  (selectedIndexChange)="onTabIndexChange($event)"></app-bottombar>
```  

## Properties

| Property              | Description                                                                    | Type | Default                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | --------- |
| tabs | set the images for the tabs | Tabs | [] |
| selectedIndex | Sets the default selected index | number | 0 |
| config.height | Sets the height of the bottombar | number | 60 |
| config.backgroundColor | Sets the background color of the bottombar | string | #0D0D12 |
| config.highlightColor | Sets the background color of the highlighted tab | string | #F8A200 |
| (selectedIndexChange) | Emits the new selected index | number |  |
