import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Test5Page } from './test5.page';

describe('Test5Page', () => {
  let component: Test5Page;
  let fixture: ComponentFixture<Test5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Test5Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Test5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
