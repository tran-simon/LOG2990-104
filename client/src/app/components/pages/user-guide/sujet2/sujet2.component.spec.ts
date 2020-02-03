import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sujet2Component } from './sujet2.component';

describe('Sujet2Component', () => {
  let component: Sujet2Component;
  let fixture: ComponentFixture<Sujet2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Sujet2Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sujet2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
