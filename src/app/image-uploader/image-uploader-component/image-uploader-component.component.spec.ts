import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploaderComponentComponent } from './image-uploader-component.component';

describe('ImageUploaderComponentComponent', () => {
  let component: ImageUploaderComponentComponent;
  let fixture: ComponentFixture<ImageUploaderComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploaderComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
