import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-rotate-button',
  standalone: true,
  imports: [],
  templateUrl: './rotate-button.component.html',
  styleUrl: './rotate-button.component.scss'
})
export class RotateButtonComponent {
  @Input() public expanded: boolean = false;
  @Output() public expandedChange: EventEmitter<boolean> = new EventEmitter();

  public toggle() {
    this.expanded = !this.expanded;
    this.expandedChange.next(this.expanded);
  }
}
