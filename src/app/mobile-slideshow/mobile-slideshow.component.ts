import {AfterViewInit, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {ProjectItem, PROJECTS} from "../vertical-slideshow/projects-config";
import {IMAGES_BY_PROJECT} from "../slideshow/slideshow-config";
import {NgbCarousel, NgbCarouselConfig, NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {MatIconModule} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {CustomCarouselComponent} from "../custom-carousel/custom-carousel.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-mobile-slideshow',
  standalone: true,
  imports: [NgbCarouselModule, MatIconModule, NgOptimizedImage, CustomCarouselComponent],
  templateUrl: './mobile-slideshow.component.html',
  styleUrl: './mobile-slideshow.component.scss'
})
export class MobileSlideshowComponent implements AfterViewInit {
  protected readonly projects: ProjectItem[] = PROJECTS;

  @ViewChildren('carouselImages') carouselImages: QueryList<ElementRef> | undefined;
  @ViewChildren(NgbCarousel) carousels: QueryList<NgbCarousel> | undefined;
  public initialPosition: number | undefined;

  constructor(
    config: NgbCarouselConfig,
    private _route: ActivatedRoute,
  ) {
    // customize default values of carousels used by this component tree
    config.interval = 0;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.pauseOnFocus = true;
    config.showNavigationIndicators = false;
    config.animation = false;
  }

  ngAfterViewInit() {
    if (window.location.href.includes('?project')) {
      this._redirectToProject();
    }
  }

  private _redirectToProject() {
    const queryParams = this._route.snapshot.queryParams;
    if (!queryParams || !queryParams['project']) return;

    const projectToGo = this.projects.find((element => element.name.toString() === queryParams['project'].toString()))
    if (!projectToGo) return;

    setTimeout(() => this._scrollToElement('item_' + projectToGo.identifier), 1000);
  }

  protected move(finalPosition: number, index: number) {
    // @ts-ignore
    const carousel: NgbCarousel = this.carousels.toArray()[index];
    // @ts-ignore
    const offset: number = this.initialPosition - finalPosition;
    if (offset < -100) { // @ts-ignore
      carousel.prev()
    }

    if (offset > 100) { // @ts-ignore
      carousel.next();
    }
  }

  private _scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    let container = document.querySelector('.mobile-container') as HTMLElement;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top - 92; // 92px padding
      container.scrollTo({top: elementPosition, behavior: 'smooth'});
    }
  }
}
