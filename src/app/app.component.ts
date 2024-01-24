import {Component, HostListener} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ChildrenOutletContexts, Router, RouterOutlet} from '@angular/router';
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

  constructor(private _router: Router) {
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

  openAbout(): void {
    if (this._router.url.includes('about')) {
      this.revertIcon();
      return void this._router.navigate(['/home']);
    }

    this.rotateIcon();
    void this._router.navigate(['/about']);
  }

  rotateIcon() {
    const element = document.getElementById('openCloseIcon');
    // @ts-ignore
    element.classList.remove('add-icon');
    // @ts-ignore
    element.classList.add('rotate-about');
  }

  revertIcon() {
    const element = document.getElementById('openCloseIcon');
    // @ts-ignore
    element.classList.remove('rotate-about');
    // @ts-ignore
    element.classList.add('add-icon');
  }
}
