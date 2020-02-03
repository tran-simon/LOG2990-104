import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sujet3Component } from './sujet3.component';

describe('Sujet3Component', () => {
  let component: Sujet3Component;
  let fixture: ComponentFixture<Sujet3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Sujet3Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sujet3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
