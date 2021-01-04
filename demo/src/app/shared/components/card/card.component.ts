import { Component } from "@angular/core";
import { View, EventData, isIOS } from "@nativescript/core";

@Component({
    selector: "ns-card",
    templateUrl: "./card.component.html",
})
export class CardComponent {
    onCardLoaded(args: EventData): void {
        const view = args.object as View;
        if (isIOS) {
            const iosUIView = view.ios as UIView;
            iosUIView.layer.shadowColor = UIColor.blackColor.CGColor;
            iosUIView.layer.shadowOpacity = 0.3;
            iosUIView.layer.shadowRadius = 3;
            iosUIView.layer.shadowOffset = CGSizeMake(5, 5);
        } else {
            view.androidElevation = 5;
        }
    }
}
