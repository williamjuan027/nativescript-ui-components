import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from "@angular/core";
import { GridLayout } from "ui/layouts/grid-layout";
import { AnimationCurve } from "ui/enums";
import { BehaviorSubject } from 'rxjs';

import { StepperConfig } from "./stepperConfig";

export const TOUCH_SPEED: number = 500; // set how fast you want the count to increment/decrement
export const DEFAULT_CONFIG: StepperConfig = {
    width: 150,
    height: 50,
    backgroundColor: '#1976d2',
    textColor: '#ffffff',
    focusBackgroundColor: '#2196f3',
    focusTextColor: '#ffffff',
    startingNum: 50,
    limitLower: 0,
    limitUpper: 100
}

@Component({
	selector: "app-snapping-stepper",
	moduleId: module.id,
	templateUrl: "./snapping-stepper.component.html",
	styleUrls: ['./snapping-stepper.component.css']
})
export class SnappingStepperComponent implements OnChanges {
	
	@Input() stepperConfig: StepperConfig;          // properties passed in by parent
	_stepperConfig: StepperConfig = DEFAULT_CONFIG; // properties that will be used by component

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
	  if (changes.stepperConfig) {
		// merge and replace the previous values with the parent defined values
		this._stepperConfig = { ...DEFAULT_CONFIG, ...changes.stepperConfig.currentValue };	  
	  }
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
			if (Math.abs(newX) < this.stepperConfig.width / 3 && (Math.abs(args.deltaY) < this.stepperConfig.height)) {
				grdLayout.translateX = newX;

				// increment or decrement stepper depending on pan direction
				// only increment if panning is still within bounds
				if (newX > 0 && this.panOpt.direction !== 'right') {
					// pan right
					this.clearPanTimer();
					// use set interval to make the increment/decrement speed more consistent,
					// not depending on how much movement the panning captures
					this.panOpt.timer = setInterval(() => {
						this.stepPositive(false);
					}, 10);
				} else if (newX <= 0 && this.panOpt.direction !== 'left') {
					// pan left
					this.clearPanTimer();
					this.panOpt.timer = setInterval(() => {
						this.stepNegative(false);
					}, 10);
				}
			} else {
				// out of bounds
				this.clearPanTimer();
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
			this.emitCountValue();
		}
	}

	clearPanTimer() {
		if (this.panOpt.timer) {
			clearInterval(this.panOpt.timer);
			this.panOpt.timer = null;
		}
	}
}
