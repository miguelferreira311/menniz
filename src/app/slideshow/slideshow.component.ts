import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GalleryItem, GalleryModule, ImageItem} from "ng-gallery";
import {Projects} from "../constants-types";
import {IMAGES_BY_PROJECT} from "./slideshow-config";
import {NgbCarouselConfig, NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
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


  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.pauseOnFocus = true;
    config.showNavigationIndicators = false;
    config.animation = true;
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
