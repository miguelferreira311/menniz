import {Component, HostListener} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ChildrenOutletContexts, RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {RotateButtonComponent} from "./rotate-button/rotate-button.component";
import {routeTransitionAnimations} from "./animations";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, RotateButtonComponent, MatIconModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    routeTransitionAnimations
  ]
})
export class AppComponent {
  public isPortrait: boolean | undefined;
  public readonly title: string = 'MENNIZ';

  @HostListener('window:resize', ['$event'])
  onResize(_event: Event): void {
    this._checkOrientation();
  }

  constructor() {
    this._checkOrientation();
  }

  protected prepareRoute(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState'];
  }

  private _checkOrientation(): void {
    this.isPortrait = this._isMobileDevice() && window.innerHeight > window.innerWidth;
  }

  private _isMobileDevice(): boolean {
    const userAgent: string = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  }
}
