import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleToolbarComponent } from './rectangle-toolbar.component';

describe('RectangleToolbarComponent', () => {
  let component: RectangleToolbarComponent;
  let fixture: ComponentFixture<RectangleToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RectangleToolbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
