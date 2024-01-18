import { Component } from '@angular/core';
import {RotateButtonComponent} from "../rotate-button/rotate-button.component";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {SlideshowComponent} from "../slideshow/slideshow.component";
import {VerticalSlideshowComponent} from "../vertical-slideshow/vertical-slideshow.component";
import {Projects} from "../constants-types";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ProjectItem} from "../vertical-slideshow/projects-config";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RotateButtonComponent,
    FormsModule,
    VerticalSlideshowComponent,
    NgIf,
    SlideshowComponent,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public readonly title: string = 'MENNIZ';
  public expanded: boolean = false;

  public projectSelected: boolean = false;
  public selectedProject: ProjectItem | undefined;

  constructor(private _router: Router) {
  }

  openAbout() {
    void this._router.navigate(['/about']);
  }

  showProject(event: ProjectItem) {
    this.selectedProject = event;
    this.projectSelected = true;
    // const element = document.getElementById('menniz-logo');
    // // @ts-ignore
    // element.className = 'shortened-element';
  }

  showVerticalSlideshow() {
    this.projectSelected = false;
    this.selectedProject = undefined;
    // const element = document.getElementById('menniz-logo');
    // // @ts-ignore
    // element.className = 'shortened-element';
  }
}
