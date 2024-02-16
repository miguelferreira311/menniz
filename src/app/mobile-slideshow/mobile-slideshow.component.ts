import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ProjectItem, PROJECTS} from "../vertical-slideshow/projects-config";
import {IMAGES_BY_PROJECT} from "../slideshow/slideshow-config";
import {NgbCarousel, NgbCarouselConfig, NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {MatIconModule} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-mobile-slideshow',
  standalone: true,
  imports: [NgbCarouselModule, MatIconModule, NgOptimizedImage],
  templateUrl: './mobile-slideshow.component.html',
  styleUrl: './mobile-slideshow.component.scss'
})
export class MobileSlideshowComponent {
  protected readonly projects: ProjectItem[] = PROJECTS;
  public images = IMAGES_BY_PROJECT;

  @ViewChildren('carouselImages') carouselImages: QueryList<ElementRef> | undefined;
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | undefined;

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 0;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.pauseOnFocus = true;
    config.showNavigationIndicators = false;
  }
}
