import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSlideshowComponent } from './mobile-slideshow.component';

describe('MobileSlideshowComponent', () => {
  let component: MobileSlideshowComponent;
  let fixture: ComponentFixture<MobileSlideshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSlideshowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
