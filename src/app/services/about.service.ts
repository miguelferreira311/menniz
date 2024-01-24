import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private _isVisibleSubject: BehaviorSubject<boolean>;
  isVisible$: Observable<boolean>;

  constructor() {
    this._isVisibleSubject = new BehaviorSubject<boolean>(false);
    this.isVisible$ = this._isVisibleSubject.asObservable();
  }

  toggleVisibility(): void {
    this._isVisibleSubject.next(!this._isVisibleSubject.value);

    if (this._isVisibleSubject.value) {
      document.body.classList.add('about-visible');
    } else {
      document.body.classList.remove('about-visible');
    }
  }

  get isVisibleSubject(): boolean {
    return this._isVisibleSubject.value;
  }
}
