import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePageComponentComponent } from './article-page-component.component';

describe('ArticlePageComponentComponent', () => {
  let component: ArticlePageComponentComponent;
  let fixture: ComponentFixture<ArticlePageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlePageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
