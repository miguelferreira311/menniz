import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GalleryItem, GalleryModule, ImageItem} from "ng-gallery";
import {Projects} from "../constants-types";
import {IMAGES_BY_PROJECT} from "./slideshow-config";
import {NgbCarouselConfig, NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {MatIconModule} from "@angular/material/icon";

// https://github.com/MurhafSousli/ngx-gallery/wiki
@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [GalleryModule, NgbCarouselModule, MatIconModule],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.scss',
  providers: [NgbCarouselConfig]
})
export class SlideshowComponent implements OnInit {
  @Input() selectedProject: Projects | undefined;
  @Output() public onCloseShow: EventEmitter<boolean> = new EventEmitter();
  public galleryItems: GalleryItem[] = [];
  private _allImages = IMAGES_BY_PROJECT;
  protected selectedImages: string[] = [];


  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    //config.interval = 5000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationIndicators = false;
    config.animation = true;
  }

  ngOnInit() {
    // @ts-ignore
    this.selectedImages = this._allImages[this.selectedProject];
    console.log('SELECTED PROJECT ==> ', this.selectedProject);
    this.galleryItems = this.selectedImages.map((img: string, index: number): GalleryItem => {
      return new ImageItem({src: img, thumb: `${this.selectedProject}_${index}`})
    })
  }

  closeSlideShow() {
    this.onCloseShow.emit(true);
  }
}
