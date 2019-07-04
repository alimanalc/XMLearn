import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsPage } from './tests.page';

describe('TestsPage', () => {
  let component: TestsPage;
  let fixture: ComponentFixture<TestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
