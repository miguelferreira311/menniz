import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SlideshowComponent} from "../slideshow/slideshow.component";
import {VerticalSlideshowComponent} from "../vertical-slideshow/vertical-slideshow.component";
import {AsyncPipe, Location, NgIf, NgOptimizedImage} from "@angular/common";
import {ProjectItem} from "../vertical-slideshow/projects-config";
import {MatIconModule} from "@angular/material/icon";
import {AboutService} from "../services/about.service";
import {AboutComponent} from "../about/about.component";
import {MobileSlideshowComponent} from "../mobile-slideshow/mobile-slideshow.component";
import {UtilitiesService} from "../services/utilities.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    VerticalSlideshowComponent,
    NgIf,
    SlideshowComponent,
    NgOptimizedImage,
    MatIconModule,
    AboutComponent,
    AsyncPipe,
    MobileSlideshowComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public readonly title: string = 'MENNIZ';
  public isMobile: boolean | undefined;
  public projectSelected: boolean = false;
  public selectedProject: ProjectItem | undefined;

  constructor(public aboutService: AboutService, private location: Location) {
    this.isMobile = UtilitiesService.isMobileDevice();
  }

  showProject(event: ProjectItem) {
    this.selectedProject = event;
    this.projectSelected = true;
    const element = document.getElementById('menniz-logo');
    // @ts-ignore
    element.classList.remove('menniz-logo');
    // @ts-ignore
    element.className = 'shortened-element';
  }

  showVerticalSlideshow() {
    this.location.replaceState(window.location.pathname);
    this.projectSelected = false;
    this.selectedProject = undefined;
    const element = document.getElementById('menniz-logo');
    // @ts-ignore
    element.classList.remove('shortened-element');
    // @ts-ignore
    element.className = 'menniz-logo';
  }
}
