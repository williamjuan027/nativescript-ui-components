import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from "@angular/core";
import { GridLayout } from "ui/layouts/grid-layout";
import { AnimationCurve } from "ui/enums";
import { BehaviorSubject } from 'rxjs';

import { StepperConfig } from "./stepperConfig";

export const TOUCH_SPEED: number = 500; // set how fast you want the count to increment/decrement

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
	private stepCountSubject: BehaviorSubject<number> = new BehaviorSubject(this.stepCount);

	private prevDeltaX: number = 0;

	private touchOpt: { timer: any, interval: number } = {
		timer: null,
		interval: TOUCH_SPEED
	};

	private panOpt: { timer: any, timerCount: number, direction: 'left' | 'right' | null } = {
		timer: null,
		timerCount: 0,
		direction: null
	};

	constructor() {
	}

	ngOnChanges(changes: SimpleChanges): void {

	}

	// private touchTimer = null;
	onStepTouch(args, state: 'positive' | 'negative') {
		// touch only gets triggered on first down, then when the fingers move, and up
		// it doesn't keep firing when you hold down your finger
		if (args.action === 'down') {
			// clear timer before starting new timer (in case there is a timer already running);
			this.clearTouchTimer();
			// start the timer when finger is first down
			this.startTouchTimer(state);
		} else if (args.action === 'up') {
			// kill timer after finger is lifted
			this.clearTouchTimer();
			this.emitCountValue();
		}
	}

	startTouchTimer(state: 'positive' | 'negative'): void {
		if (state === 'positive' && this.stepCount < this.stepperConfig.limitUpper) {
			this.stepPositive(false);
			this.touchOpt.interval = this.touchOpt.interval * 0.8;	// accelerate
			this.touchOpt.timer = setTimeout(this.startTouchTimer.bind(this, state), this.touchOpt.interval);
		} else if (state === 'negative' && this.stepCount > this.stepperConfig.limitLower) {
			this.stepNegative(false);
			this.touchOpt.interval = this.touchOpt.interval * 0.8;  // accelerate
			this.touchOpt.timer = setTimeout(this.startTouchTimer.bind(this, state), this.touchOpt.interval);
		} else {
			// done counting
			this.clearTouchTimer();
		}
	}

	clearTouchTimer(): void {
		// if timer exist, stop and set it to null
		if (this.touchOpt.timer) {
			clearTimeout(this.touchOpt.timer);
			this.touchOpt.timer = null;
		}
		// reset interval to initial speed
		this.touchOpt.interval = TOUCH_SPEED;
	}

	stepNegative(shouldEmitValue: boolean = true): void {
		// decrement if still within bounds
		if (this.stepCount > this.stepperConfig.limitLower) {
			this.stepCount -= 1;
			this.stepCountSubject.next(this.stepCount);

			// TODO: emit only when its settled
			if (shouldEmitValue) {
				this.emitCountValue();
			}
		}
	}

	stepPositive(shouldEmitValue: boolean = true): void {
		// increment if still within bounds
		if (this.stepCount < this.stepperConfig.limitUpper) {
			this.stepCount += 1;
			this.stepCountSubject.next(this.stepCount);

			if (shouldEmitValue) {
				this.emitCountValue();
			}
		}
	}

	emitCountValue(): void {
		this.valueChange.emit(this.stepCount);
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

				// increment or decrement stepper depending on pan direction
				// only increment if panning is still within bounds
				if (newX > 0 && this.panOpt.direction !== 'right') {
					// pan right
					this.clearPanTimer();
					this.panOpt.timer = setInterval(() => {
						this.stepPositive();
					}, 10);
				} else if (newX <= 0 && this.panOpt.direction !== 'left') {
					// pan left
					this.clearPanTimer();
					this.panOpt.timer = setInterval(() => {
						this.stepNegative();
					}, 10);
				}
			} else {
				// out of bounds
				console.log('out of bounds?');
				// this.clearPanTimer();
			}
			this.prevDeltaX = args.deltaX;
		} else if (args.state === 3) {
			// finger up
			this.prevDeltaX = 0;

			// snap back to original position
			grdLayout.animate({
				translate: { x: 0, y: 0 },
				curve: AnimationCurve.cubicBezier(0, 0.405, 0, 1.285),
				duration: 200
			});
			this.panOpt.direction = null;
			this.clearPanTimer();
		}
	}

	clearPanTimer() {
		if (this.panOpt.timer) {
			clearInterval(this.panOpt.timer);
			this.panOpt.timer = null;
		}
	}
}
