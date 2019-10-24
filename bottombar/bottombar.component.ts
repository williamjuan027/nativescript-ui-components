import { Component, OnChanges, SimpleChanges, AfterViewInit, Input, Output, ViewChild, ViewChildren, QueryList, ElementRef, EventEmitter } from "@angular/core";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { screen } from "tns-core-modules/platform/platform";
import { Tabs, BottombarConfig } from "./bottombar-config";

@Component({
  selector: "app-bottombar",
  templateUrl: "./bottombar.component.html"
})
export class BottombarComponent implements OnChanges, AfterViewInit {

	@Input() tabs: Tabs = [];
	@Input() selectedIndex: number = 0;
	@Input() config: BottombarConfig;
	@Output() selectedIndexChange = new EventEmitter<number>();

	// to animate the highlight
	@ViewChild('tabHighlight', { static: false }) tabHighlight: ElementRef;

	// to animate image
	@ViewChildren('tabImage') tabImage: QueryList<ElementRef>

	// to track selected tab index
	private _selectedTab: number = 0;

	gridColumns: string;

	constructor() {
	}

	ngOnChanges(changes: SimpleChanges): void {
	  if (changes.tabs && changes.tabs.currentValue) {
	    let wildcard = [];
	    changes.tabs.currentValue.forEach(item => {
	      wildcard.push('*');
	    });
	    this.gridColumns = wildcard.join(',');
	  }
	  if (changes.selectedIndex && changes.selectedIndex.currentValue >= 0
		&& changes.selectedIndex.currentValue !== this._selectedTab
		&& this.tabImage) {
	    // set the selected tab to the new index, but don't emit event
	    this.selectTab(changes.selectedIndex.currentValue, false);
	  }
	}

	ngAfterViewInit() {
	  setTimeout(() => {
	    this.selectTab(this.selectedIndex || 0, false);
	  }, 100);
	}

	selectTab(index: number, shouldEmit: boolean = true): void {
	  const previousTab = this._selectedTab;
	  // only animate if user taps on a different tab
	  if (index != this._selectedTab) {
	    this._selectedTab = index;
	    this.tabHighlight.nativeElement.animate({
	      translate: { x: index * screen.mainScreen.widthDIPs / this.tabs.length, y: 0 },
	      curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
	      duration: 300
	    });
	    this.animateCurrentImage(this.getImage(index));
	    this.animatePreviousImage(this.getImage(previousTab));
	  }
	  if (shouldEmit) {
	    this.selectedIndexChange.emit(this._selectedTab);
	  }
	}

	getImage(index: number) {
	  if (index < this.tabs.length) {
	    return this.tabImage.toArray()[index];
	  } else {
	    return this.tabImage.toArray()[0];
	  }
	}

	// enlarge current tab image
	animateCurrentImage(arg: any): void {
	  arg.nativeElement.animate({
	    scale: { x: 1.2, y: 1.2 },
	    curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
	    duration: 300
	  });
	}

	// shrink previous tab image back to original size
	animatePreviousImage(arg: any): void {
	  arg.nativeElement.animate({
	    scale: { x: 1, y: 1 },
	    curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
	    duration: 300
	  });
	}

}
