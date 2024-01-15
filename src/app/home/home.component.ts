import { Component } from '@angular/core';
import {RotateButtonComponent} from "../rotate-button/rotate-button.component";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {SlideshowComponent} from "../slideshow/slideshow.component";
import {VerticalSlideshowComponent} from "../vertical-slideshow/vertical-slideshow.component";
import {Projects} from "../constants-types";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RotateButtonComponent,
    FormsModule,
    VerticalSlideshowComponent,
    NgIf,
    SlideshowComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public readonly title: string = 'MENNIZ';
  public expanded: boolean = false;

  public projectSelected: boolean = false;
  public selectedProject: Projects | undefined;

  constructor(private _router: Router) {
  }

  openAbout() {
    void this._router.navigate(['/about']);
  }

  showProject(event: Projects) {
    this.selectedProject = event;
    this.projectSelected = true;
  }

  showVerticalSlideshow() {
    this.projectSelected = false;
    this.selectedProject = undefined;
  }
}
