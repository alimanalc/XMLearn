import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoURLComponent } from './info-url.component';

describe('InfoURLComponent', () => {
  let component: InfoURLComponent;
  let fixture: ComponentFixture<InfoURLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoURLComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoURLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
