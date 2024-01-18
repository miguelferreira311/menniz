import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {RotateButtonComponent} from "../rotate-button/rotate-button.component";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {aboutAnimation, slideInAnimation} from "../animations";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    RotateButtonComponent,
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  expanded: boolean = true;

  constructor(private _router: Router) {}

  closeAbout(): void {
    void this._router.navigate(['/home']);
  }

  openMail(): void {
    window.location.href = "mailto:info@menniz.com?subject=MENNIZ"
  }
}
