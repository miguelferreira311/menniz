import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollableWindow,
  CdkVirtualScrollViewport
} from "@angular/cdk/scrolling";
import {ProjectItem, PROJECTS} from "./projects-config";
import {RotateButtonComponent} from "../rotate-button/rotate-button.component";
import {Projects} from "../constants-types";

@Component({
  selector: 'app-vertical-slideshow',
  standalone: true,
  imports: [
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollableWindow,
    RotateButtonComponent
  ],
  templateUrl: './vertical-slideshow.component.html',
  styleUrl: './vertical-slideshow.component.scss'
})
export class VerticalSlideshowComponent {
  @Output() public onProjectSelect: EventEmitter<Projects> = new EventEmitter();
  public projects: ProjectItem[] = PROJECTS;

  public selectProject(project: ProjectItem) {
    console.log('SELECTED PROJECT ==> ', project);
    this.onProjectSelect.emit(project.identifier);
  }
}
