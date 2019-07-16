import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from "@angular/core";
import { GridLayout } from "ui/layouts/grid-layout";

import { StepperConfig } from "./stepperConfig";

@Component({
	selector: "app-snapping-stepper",
	moduleId: module.id,
	templateUrl: "./snapping-stepper.component.html",
	styleUrls: ['./snapping-stepper.component.css']
})
export class SnappingStepperComponent implements OnChanges {

	@Input() stepperConfig: StepperConfig = {
		width: 200,
		height: 50,
		backgroundColor: '#4400dd',
		textColor: '#ffffff',
		focusBackgroundColor: '#6622ff',
		focusTextColor: '#ffffff',
		startingNum: 0,
		limitLower: -50,
		limitUpper: 50,
	};

	@Output() valueChange = new EventEmitter<number>();

	public stepCount: number = this.stepperConfig.startingNum;

	private prevDeltaX: number = 0;

	constructor() {
	}

	ngOnChanges(changes: SimpleChanges): void {

	}

	stepNegative() {
		// decrement if still within bounds
		if (this.stepCount > this.stepperConfig.limitLower) {
			this.stepCount -= 1;
			this.valueChange.emit(this.stepCount);
		}
	}

	stepPositive() {
		// increment if still within bounds
		if (this.stepCount < this.stepperConfig.limitUpper) {
			this.stepCount += 1;
			this.valueChange.emit(this.stepCount);
		}
	}

	onCountPan(args) {
		let grdLayout: GridLayout = <GridLayout>args.object;
		let newX: number = grdLayout.translateX + args.deltaX - this.prevDeltaX;

		if (args.state === 0) {
			// finger down
			this.prevDeltaX = 0;
		} else if (args.state === 2) {
			// finger moving
			if (Math.abs(newX) < this.stepperConfig.width / 3) {
				grdLayout.translateX = newX;
			}
			this.prevDeltaX = args.deltaX;

			// increment or decrement stepper depending on pan direction
			if (newX > 0) {
				// pan right
				this.stepPositive();
			} else {
				// pan left
				this.stepNegative();
			}
		} else if (args.state === 3) {
			// finger up
			this.prevDeltaX = 0;

			// snap back to original position
			grdLayout.animate({
				translate: { x: 0, y: 0 },
				duration: 200
			});
		}
	}
}
