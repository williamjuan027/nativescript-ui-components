import { Directive, HostListener } from '@angular/core';
import {
  isIOS,
  EventData,
  PinchGestureEventData,
  View,
  Utils,
} from '@nativescript/core';

@Directive({
  selector: '[pinchToZoom]'
})
export class PinchToZoomDirective {

  private _view: View;
  private _imageBoundary = 70;
  private _isOutOfBounds = false;

  @HostListener('loaded', ['$event'])
    onLoaded(args: EventData): void {
      this._view = args.object as View;
    }

  @HostListener('pinch', ['$event'])
    onPinch(args: PinchGestureEventData): void {
      if (!this._view) {
        // do not process any pinch event if view is not loaded yet
        return;
      }

      if (args.state === 1) {
        // check if pinch is triggered on the edges of the image (out of the
        // boundaries we set earlier)
        this._setOutOfBounds(args.getFocusX(), args.getFocusY())

        // disable zoom if pinch's focus point is outside of the boundaries
        if (!this._isOutOfBounds) {
          // pinch gesture
          this._setFocusPoint(
            args.getFocusX(),
            args.getFocusY()
          );
        }
      } else if (args.state === 2 && args.scale !== 1) {
        // disable zoom if pinch's focus point is outside of the boundaries
        if (!this._isOutOfBounds) {
          // translate the amount pinched into zoom level on the view
          this._setZoomScale(args.scale);
        }
      } else if (args.state === 3) {
        // gesture ended (finger lifted)
        this._reset();
      }
  }

  private _reset() {
    if (isIOS) {
      // reset origin to always scale back to center
      // android handles this automatically
      this._view.originX = 0.5;
      this._view.originY = 0.5;
    }

    // animate the image to snap back to its original position
    this._view
      .animate({
        scale: { x: 1, y: 1 },
        curve: 'easeOut',
        duration: 300,
      })
      .catch((e) => {
        // reset the zoom manually if animation fail
        this._view.scaleX = 1;
        this._view.scaleY = 1;
      });
  }

  private _setZoomScale(newScale: number): void {
    // only update scale using rounded values and when above a certain threshold
    // to prevent stuttering when zooming in
    // remove newScale >= 1 check if you want to be able to zoom out
    if (newScale >= 1 && newScale - this._view.scaleX > 0.01) {
      // only allow view to be zoomed in
      this._view.scaleX = Math.round(newScale * 100) / 100;
      this._view.scaleY = Math.round(newScale * 100) / 100;
    }
  }

  private _setFocusPoint(focusX: number, focusY: number): void {
    // set the focus point of the zoom
    this._view.originX =
      focusX /
      Utils.layout.toDeviceIndependentPixels(
        this._view.getMeasuredWidth()
      );
    this._view.originY =
      focusY /
      Utils.layout.toDeviceIndependentPixels(
        this._view.getMeasuredHeight()
      );
  }

  private _setOutOfBounds(focusX: number, focusY: number): void {
    // check if focus points fall out of the boundaries are not
    this._isOutOfBounds =
      focusX < this._imageBoundary ||
      focusX > (this._view.getMeasuredWidth() - this._imageBoundary) ||
      focusY < this._imageBoundary ||
      focusY > (this._view.getMeasuredHeight() - this._imageBoundary)
  }

}
