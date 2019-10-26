import { Component, OnChanges, SimpleChanges, AfterViewInit, Input, Output, ViewChild, ViewChildren, QueryList, ElementRef, EventEmitter } from "@angular/core";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { screen } from "tns-core-modules/platform/platform";
import { Tabs, BottombarSlidingColorConfig } from "./bottombar-sliding-color-config";
import { Animation, AnimationDefinition } from "tns-core-modules/ui/animation";

@Component({
	selector: "app-bottombar-sliding-color",
	moduleId: module.id,
	templateUrl: "./bottombar-sliding-color.component.html"
})
export class BottombarSlidingColorComponent implements OnChanges, AfterViewInit {

	@Input() tabs: Tabs = [];
	@Input() selectedIndex: number = 0;
	@Input() config: BottombarSlidingColorConfig;
	@Output() selectedIndexChange = new EventEmitter<number>();

	// to animate the highlight
	@ViewChild('tabMask', { static: false }) tabMask: ElementRef;
	@ViewChild('centerMask', { static: false }) centerMask: ElementRef;
	@ViewChild('leftMask', { static: false }) leftMask: ElementRef;
	@ViewChild('rightMask', { static: false }) rightMask: ElementRef;

	// to animate image
	@ViewChildren('tabImage') tabImage: QueryList<ElementRef>
	@ViewChildren('tabLabel') tabLabel: QueryList<ElementRef>

	// to track selected tab index
	private _selectedTab: number = null;

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
		this.initializeTabs();
	}

	initializeTabs(): void {
		this.centerMask.nativeElement.width = screen.mainScreen.widthDIPs / this.tabs.length;
		this.leftMask.nativeElement.width = screen.mainScreen.widthDIPs;
		this.rightMask.nativeElement.width = screen.mainScreen.widthDIPs;

		this.leftMask.nativeElement.translateX = this.getMaskTranslateX(this.selectedIndex - 1);
		this.rightMask.nativeElement.translateX = this.getMaskTranslateX(this.selectedIndex);

		this._selectedTab = this.selectedIndex;

		this.tabImage.toArray().forEach((item, i) => {
			if (i === this.selectedIndex) {
				this.animateCurrentImage(item, false);
			} else {
				this.animatePreviousImage(item, false);
			}
		});

		this.tabLabel.toArray().forEach((item, i) => {
			if (i === this.selectedIndex) {
				this.animateCurrentText(item, false);
			} else {
				this.animatePreviousText(item, false);
			}
		});
	}

	selectTab(index: number, shouldEmit: boolean = true): void {
		const previousTab = this._selectedTab;
		// only animate if user taps on a different tab
		if (index !== this._selectedTab) {
			this._selectedTab = index;
			this.animateTab(index, previousTab);

			this.animateCurrentImage(this.getImage(index)).then(() => {
				this.animateCurrentText(this.getText(index))
			});
			this.animatePreviousImage(this.getImage(previousTab)).then(() => {
				this.animatePreviousText(this.getText(previousTab))
			});

		}
		if (shouldEmit) {
			this.selectedIndexChange.emit(this._selectedTab);
		}
	}


	animateTab(index: number, previousIndex: number): void {
		const ogTranslateX = this.tabMask.nativeElement.translateX;
		let definitions = new Array<AnimationDefinition>();

		let a1: AnimationDefinition = {
			target: index > previousIndex ? this.rightMask.nativeElement : this.leftMask.nativeElement,
			translate: { x: this.getMaskTranslateX(index), y: 0 },
			duration: 200
		}
		definitions.push(a1);

		let animationSet = new Animation(definitions);
		animationSet.play().then(() => {
			let definitions2 = new Array<AnimationDefinition>();
			let a1: AnimationDefinition = {
				target: this.leftMask.nativeElement,
				translate: { x: this.getMaskTranslateX(index), y: 0 },
				duration: 250
			}
			definitions2.push(a1);

			let a2: AnimationDefinition = {
				target: this.rightMask.nativeElement,
				translate: { x: this.getMaskTranslateX(index), y: 0 },
				duration: 250
			}
			definitions2.push(a2);

			let animationSet2 = new Animation(definitions2);
			animationSet2.play().then(() => {
				console.log('done');
			});
		});
	}

	// ----------------------------------------------------------------------
	// Mask Animation

	getMaskTranslateX(index: number): number {
		return (index * screen.mainScreen.widthDIPs / this.tabs.length) - screen.mainScreen.widthDIPs;
	}

	// ----------------------------------------------------------------------
	// Image Animation

	getImage(index: number) {
		if (index < this.tabs.length) {
			return this.tabImage.toArray()[index];
		} else {
			return this.tabImage.toArray()[0];
		}
	}

	// enlarge current tab image
	animateCurrentImage(arg: any, animate: boolean = true): Promise<any> {
		if (animate) {
			return arg.nativeElement.animate({
				scale: { x: 1.3, y: 1.3 },
				translate: { x: 0, y: - 10 },
				curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
				duration: 300
			});
		} else {
			arg.nativeElement.scaleX = 1.3;
			arg.nativeElement.scaleY = 1.3;
			arg.nativeElement.translateX = 0;
			arg.nativeElement.translateY = - 10;
			return Promise.resolve();
		}
	}

	// shrink previous tab image back to original size
	animatePreviousImage(arg: any, animate: boolean = true): Promise<any> {
		if (animate) {
			return arg.nativeElement.animate({
				scale: { x: 1, y: 1 },
				translate: { x: 0, y: 0 },
				curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
				duration: 300
			});
		} else {
			arg.nativeElement.scaleX = 1;
			arg.nativeElement.scaleY = 1;
			arg.nativeElement.translateX = 0;
			arg.nativeElement.translateY = 0;
			return Promise.resolve();
		}
	}

	// ----------------------------------------------------------------------
	// Text Animation

	getText(index: number) {
		if (index < this.tabs.length) {
			return this.tabLabel.toArray()[index];
		} else {
			return this.tabLabel.toArray()[0];
		}
	}

	// animate in current tab text
	animateCurrentText(arg: any, animate: boolean = true): Promise<any> {
		if (animate) {
			return arg.nativeElement.animate({
				translate: { x: 0, y: 0 },
				curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
				duration: 300
			});
		} else {
			arg.nativeElement.translateX = 0;
			arg.nativeElement.translateY = 0;
			return Promise.resolve();
		}
	}

	// animate out previous tab text
	animatePreviousText(arg: any, animate: boolean = true): Promise<any> {
		if (animate) {
			return arg.nativeElement.animate({
				translate: { x: 0, y: 80 },
				curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
				duration: 300
			});
		} else {
			arg.nativeElement.translateX = 0;
			arg.nativeElement.translateY = 80;
			return Promise.resolve();
		}
	}

}
