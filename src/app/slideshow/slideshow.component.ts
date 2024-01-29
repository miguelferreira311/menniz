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
    config.animation = false;
  }

  // 08_Photoshoot (3).jpg
  // 07_Photoshoot (6)_ajustada4.jpg
  // 06_Photoshoot (22)_ajustada.jpg
  // 02_Photoshoot (11).jpg
  // 01_Photoshoot (4).jpg
  // 00_Photoshoot (21).jpg
  // 04_Photoshoot (8)_ajustada1.jpg
  // 11_Photoshoot 1V2A5987-HDR_versao cortada.png
  // 06_1V2A6470.jpg
  // 05_1V2A6063-Editar_ajustada.jpg
  // 04_1V2A6162.jpg
  // 03_1V2A6374-Pano-Editar-2.jpg
  // 02_1V2A6465-Pano.jpg
  // 02_1V2A5580-Panorノica HDR.jpg
  // 03_1V2A5707-Editar.jpg
  // 00_1V2A5596-Panorノica HDR.jpg
  // 02_IMG_9894_ajustada v3.jpg
  // 01_1V2A0121-Pano.jpg
  // 00_1V2A0107-Pano.jpg
  ngOnInit() {
    // @ts-ignore
    this.selectedImages = this._allImages[this.selectedProject?.identifier];
    this.galleryItems = this.selectedImages.map((img: string, index: number): GalleryItem => {
      return new ImageItem({src: img, thumb: `${this.selectedProject?.identifier}_${index}`})
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

  closeSlideShow() {
    this.onCloseShow.emit(true);
  }
}
