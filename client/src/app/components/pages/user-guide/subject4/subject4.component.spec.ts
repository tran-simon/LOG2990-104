import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Subject4Component } from 'src/app/components/pages/user-guide/subject4/subject4.component';

describe('Sujet4Component', () => {
  let component: Subject4Component;
  let fixture: ComponentFixture<Subject4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Subject4Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Subject4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
