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
export class SlideshowComponent implements OnInit, AfterViewInit {
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


  ngAfterViewInit() {
    // @ts-ignore
    this.carouselImages.changes.subscribe(() => {
      // @ts-ignore
      this.carouselImages.forEach(imageElement => {
        const image = imageElement.nativeElement;
        if (image.complete) {
          this.handleImageLoad(image);
        } else {
          // Set up a load event listener
          image.onload = () => {
            this.handleImageLoad(image);
          };
        }
      });
    })
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

  private handleImageLoad(image: HTMLImageElement): void {
    const imageHeight = image.offsetHeight;
    console.log(imageHeight);
    this.renderer.setStyle(
      image,
      'margin-top',
      `calc((100vh - ${imageHeight}px) / 2)`
    );
  }

  ngOnInit() {
    // @ts-ignore
    this.selectedImages = this._allImages[this.selectedProject?.identifier];
    console.log('SELECTED PROJECT ==> ', this.selectedProject);
    this.galleryItems = this.selectedImages.map((img: string, index: number): GalleryItem => {
      return new ImageItem({src: img, thumb: `${this.selectedProject?.identifier}_${index}`})
    })
  }

  closeSlideShow() {
    this.onCloseShow.emit(true);
  }
}
