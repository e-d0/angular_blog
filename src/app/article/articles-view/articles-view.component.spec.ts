import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesViewComponent } from './articles-view.component';

describe('ArticlesViewComponent', () => {
  let component: ArticlesViewComponent;
  let fixture: ComponentFixture<ArticlesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
