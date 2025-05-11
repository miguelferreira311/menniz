import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ProjectItem} from "../vertical-slideshow/projects-config";
import {IMAGES_BY_PROJECT} from "../slideshow/slideshow-config";
import {slideNextPrevAnimation} from "../animations";

@Component({
  selector: 'app-custom-carousel',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './custom-carousel.component.html',
  styleUrl: './custom-carousel.component.scss',
  animations: [slideNextPrevAnimation]
})
export class CustomCarouselComponent implements OnInit {
  @Input() project!: ProjectItem;
  public images = IMAGES_BY_PROJECT;
  public slides: string[] = [];
  public currentSlide: number = 0;
  public initialPosition: number | undefined;
  public slideDirection: 'next' | 'prev' = 'next';

  ngOnInit() {
    this.slides = this.images[this.project.identifier];
    // this._autoPlay();
  }

  previousSlide() {
    this.slideDirection = 'prev';
    this.currentSlide =
      this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.slideDirection = 'next';
    this.currentSlide =
      this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
  }

  private _autoPlay(): void {
    setInterval(() => {
      this.nextSlide();
    }, 20000); // Change slide every 20 seconds
  }

  protected move(finalPosition: number) {
    // @ts-ignore
    const offset: number = this.initialPosition - finalPosition;
    if (offset < -100) { // @ts-ignore
      this.previousSlide();
    }

    if (offset > 100) { // @ts-ignore
      this.nextSlide();
    }
  }

  public slideHelper() {
    return {
      value: '',
      params: {
        enterTransform: this.slideDirection === 'next' ? 'translateX(100%)' : 'translateX(-100%)',
        leaveTransform: this.slideDirection === 'next' ? 'translateX(-100%)' : 'translateX(100%)'
      }
    }
  }
}

