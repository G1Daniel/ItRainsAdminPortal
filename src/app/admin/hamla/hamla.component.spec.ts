/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HamlaComponent } from './hamla.component';

describe('HamlaComponent', () => {
  let component: HamlaComponent;
  let fixture: ComponentFixture<HamlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HamlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HamlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
