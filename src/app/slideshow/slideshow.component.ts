import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2, ViewChild,
  ViewChildren
} from '@angular/core';
import {GalleryItem, GalleryModule, ImageItem} from "ng-gallery";
import {Projects} from "../constants-types";
import {IMAGES_BY_PROJECT} from "./slideshow-config";
import {NgbCarousel, NgbCarouselConfig, NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {MatIconModule} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {ProjectItem} from "../vertical-slideshow/projects-config";

// https://github.com/MurhafSousli/ngx-gallery/wiki
@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [GalleryModule, NgbCarouselModule, MatIconModule, NgOptimizedImage],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.scss',
  providers: [NgbCarouselConfig]
})
export class SlideshowComponent implements OnInit {
  @Input() selectedProject: ProjectItem | undefined;
  @Output() public onCloseShow: EventEmitter<boolean> = new EventEmitter();
  public galleryItems: GalleryItem[] = [];
  private _allImages = IMAGES_BY_PROJECT;
  protected selectedImages: string[] = [];
  protected paused = false;

  @ViewChildren('carouselImages') carouselImages: QueryList<ElementRef> | undefined;
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | undefined;

  constructor(config: NgbCarouselConfig, private renderer: Renderer2) {
    // customize default values of carousels used by this component tree
    config.interval = 20000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.pauseOnFocus = true;
    config.showNavigationIndicators = false;
    config.animation = true;
  }

  protected togglePaused(): void {
    if (this.paused) {
      // @ts-ignore
      this.carousel.cycle();
    } else {
      // @ts-ignore
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  ngOnInit() {
    // @ts-ignore
    this.selectedImages = this._allImages[this.selectedProject?.identifier];
    this.galleryItems = this.selectedImages.map((img: string, index: number): GalleryItem => {
      return new ImageItem({src: img, thumb: `${this.selectedProject?.identifier}_${index}`})
    })
  }

  closeSlideShow() {
    this.onCloseShow.emit(true);
  }
}
