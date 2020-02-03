import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorLightnessComponent } from './color-lightness.component';

describe('ColorLightnessComponent', () => {
  let component: ColorLightnessComponent;
  let fixture: ComponentFixture<ColorLightnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorLightnessComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorLightnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
