import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChildrenOutletContexts, RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {RotateButtonComponent} from "./rotate-button/rotate-button.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {aboutAnimation, routeTransitionAnimations, slideInAnimation} from "./animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, RotateButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    routeTransitionAnimations
  ]
})
export class AppComponent {
  public readonly title: string = 'MENNIZ';

  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    console.log(this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']);
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState'];
  }

}
