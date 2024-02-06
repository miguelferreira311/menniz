import {Component, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {ProjectItem, PROJECTS} from "./projects-config";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-vertical-slideshow',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './vertical-slideshow.component.html',
  styleUrl: './vertical-slideshow.component.scss'
})
export class VerticalSlideshowComponent {
  @Output() public onProjectSelect: EventEmitter<ProjectItem> = new EventEmitter();
  public projects: ProjectItem[] = PROJECTS;
  public activeDescriptionIndex: number = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(_event: Event) {
    this._changeVisibleDescription();
  }

  constructor(private el: ElementRef) {
  }

  public selectProject(project: ProjectItem): void {
    this.onProjectSelect.emit(project);
  }

  private _changeVisibleDescription(): void {
    const windowHeight: number = window.innerHeight;
    const componentOffset = this.el.nativeElement.offsetTop;

    this.projects.forEach((_image: ProjectItem, index: number) => {
      this._activateDescription(componentOffset, windowHeight, index);
    });
  }

  private _activateDescription(componentOffset: number, windowHeight: number, index: number) {
    const imageElement = this.el.nativeElement.querySelectorAll('.project-image')[index];
    const rect = imageElement.getBoundingClientRect();

    // Calculate the position of the top and bottom of the image relative to the viewport
    const topPosition: number = rect.top - componentOffset;
    const bottomPosition: number = rect.bottom - componentOffset;

    if (topPosition < windowHeight * 0.5 && bottomPosition > windowHeight * 0.5) {
      // Check if a new image is starting to appear
      if (index !== this.activeDescriptionIndex) {

        // Update the visibleImageIndex to avoid triggering the action multiple times
        this.activeDescriptionIndex = index;
      }
    }
  }
}
