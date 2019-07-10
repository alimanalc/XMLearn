import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Test6Page } from './test6.page';

describe('Test6Page', () => {
  let component: Test6Page;
  let fixture: ComponentFixture<Test6Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Test6Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Test6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
