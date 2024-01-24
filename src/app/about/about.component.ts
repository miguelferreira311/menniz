import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {slideUpDownAnimation} from "../animations";
import {AboutService} from "../services/about.service";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage,
    AsyncPipe,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [slideUpDownAnimation],
})
export class AboutComponent implements OnInit {
  isVisible: boolean = false;

  constructor(public aboutService: AboutService) {}

  ngOnInit() {
    this.aboutService.isVisible$.subscribe((visible: boolean) => {
      this.isVisible = visible;
    })
  }

  openMail(): void {
    window.location.href = "mailto:info@menniz.com?subject=MENNIZ"
  }
}
