import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgButtonComponent } from './img-button.component';

describe('ImgButtonComponent', () => {
  let component: ImgButtonComponent;
  let fixture: ComponentFixture<ImgButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImgButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
