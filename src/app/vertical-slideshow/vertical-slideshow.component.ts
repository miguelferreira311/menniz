import {Component, EventEmitter, Output} from '@angular/core';
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

  public selectProject(project: ProjectItem) {
    this.onProjectSelect.emit(project);
  }
}
