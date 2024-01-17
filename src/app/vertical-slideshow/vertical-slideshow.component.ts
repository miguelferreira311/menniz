import {Component, EventEmitter, Output} from '@angular/core';
import {ProjectItem, PROJECTS} from "./projects-config";
import {RotateButtonComponent} from "../rotate-button/rotate-button.component";
import {Projects} from "../constants-types";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-vertical-slideshow',
  standalone: true,
  imports: [
    RotateButtonComponent,
    NgOptimizedImage
  ],
  templateUrl: './vertical-slideshow.component.html',
  styleUrl: './vertical-slideshow.component.scss'
})
export class VerticalSlideshowComponent {
  @Output() public onProjectSelect: EventEmitter<ProjectItem> = new EventEmitter();

  public projects: ProjectItem[] = PROJECTS;

  public selectProject(project: ProjectItem) {
    console.log('SELECTED PROJECT ==> ', project);
    this.onProjectSelect.emit(project);
  }
}
