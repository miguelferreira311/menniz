import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {ProjectItem, PROJECTS} from "./projects-config";
import {NgOptimizedImage} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';


@Component({
  selector: 'app-vertical-slideshow',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './vertical-slideshow.component.html',
  styleUrl: './vertical-slideshow.component.scss'
})
export class VerticalSlideshowComponent implements OnInit {
  @Output() public onProjectSelect: EventEmitter<ProjectItem> = new EventEmitter();
  public projects: ProjectItem[] = PROJECTS;
  public activeDescriptionIndex: number = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(_event: Event) {
    this._changeVisibleDescription();
  }

  constructor(
    private el: ElementRef,
    private location: Location,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (window.location.href.includes('?project')) {
      this._redirectToProject();
    }
  }

  private _redirectToProject() {
    const queryParams = this._route.snapshot.queryParams;
    if(!queryParams || !queryParams['project']) return;

    const projectToGo = this.projects.find((element => element.name.toString() === queryParams['project'].toString()))
    if(!projectToGo) return;

    console.log('VOU EMITIR EVENTO!', queryParams);
    setTimeout(() => {
      this.onProjectSelect.emit(projectToGo);
    }, 10);
  }

  public selectProject(project: ProjectItem): void {
    this.onProjectSelect.emit(project);
    this.location.replaceState(window.location.pathname + `?project=${project.name}`);
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
