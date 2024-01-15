import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalSlideshowComponent } from './vertical-slideshow.component';

describe('VerticalSlideshowComponent', () => {
  let component: VerticalSlideshowComponent;
  let fixture: ComponentFixture<VerticalSlideshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalSlideshowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
