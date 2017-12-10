import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTeaserMainComponent } from './article-teaser-main.component';

describe('ArticleTeaserMainComponent', () => {
  let component: ArticleTeaserMainComponent;
  let fixture: ComponentFixture<ArticleTeaserMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleTeaserMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTeaserMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
