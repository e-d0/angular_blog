import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTeaserComponent } from './article-teaser.component';

describe('ArticleTeaserComponent', () => {
  let component: ArticleTeaserComponent;
  let fixture: ComponentFixture<ArticleTeaserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleTeaserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
