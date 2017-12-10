import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeComponentComponent } from './cke-component.component';

describe('CkeComponentComponent', () => {
  let component: CkeComponentComponent;
  let fixture: ComponentFixture<CkeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CkeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CkeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
