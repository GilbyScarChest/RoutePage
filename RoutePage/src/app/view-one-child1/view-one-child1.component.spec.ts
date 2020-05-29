import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneChild1Component } from './view-one-child1.component';

describe('ViewOneChild1Component', () => {
  let component: ViewOneChild1Component;
  let fixture: ComponentFixture<ViewOneChild1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOneChild1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOneChild1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
