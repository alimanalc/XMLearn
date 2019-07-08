import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gdpr2Page } from './gdpr2.page';

describe('Gdpr2Page', () => {
  let component: Gdpr2Page;
  let fixture: ComponentFixture<Gdpr2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gdpr2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gdpr2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
