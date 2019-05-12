import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Data2Page } from './data2.page';

describe('Data2Page', () => {
  let component: Data2Page;
  let fixture: ComponentFixture<Data2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Data2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Data2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
