import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTeaserComponent } from './about-teaser.component';

describe('AboutTeaserComponent', () => {
  let component: AboutTeaserComponent;
  let fixture: ComponentFixture<AboutTeaserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutTeaserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
