import {ChangeDetectorRef, Component, HostListener} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {AboutService} from "./services/about.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MatIconModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public isPortrait: boolean | undefined;
  public isMobile: boolean | undefined;
  public readonly title: string = 'MENNIZ';

  @HostListener('window:resize', ['$event'])
  onResize(_event: Event): void {
    this._checkOrientation();
  }

  constructor(public aboutService: AboutService,
              private cdr: ChangeDetectorRef) {
    this._checkOrientation();
  }

  private _checkOrientation(): void {
    this.isMobile = this._isMobileDevice();
    this.isPortrait = this.isMobile && window.innerHeight > window.innerWidth;
  }

  private _isMobileDevice(): boolean {
    const userAgent: string = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  }

  openAbout(): void {
    this.aboutService.toggleVisibility();
    this.cdr.detectChanges();

    if (this.aboutService.isVisibleSubject) {
      return this.rotateIcon();
    }

    this.revertIcon();
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
