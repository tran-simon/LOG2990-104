import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerComponent } from 'src/app/components/shared/color-picker/color-picker.component';
import { CustomInputComponent } from 'src/app/components/shared/inputs/custom-input/custom-input.component';
import { HexInputComponent } from 'src/app/components/shared/inputs/hex-input/hex-input.component';
import { NumberInputComponent } from 'src/app/components/shared/inputs/number-input/number-input.component';

import { ColorLightnessComponent } from './color-lightness.component';
import Spy = jasmine.Spy;

describe('ColorLightnessComponent', () => {
  let component: ColorLightnessComponent;
  let fixture: ComponentFixture<ColorLightnessComponent>;
  let drawSpy: Spy;
  let lightnessChangedSpy: Spy;
  let colorLightnessElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
      declarations: [ColorPickerComponent, ColorLightnessComponent, NumberInputComponent, CustomInputComponent, HexInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorLightnessComponent);
    component = fixture.componentInstance;

    colorLightnessElement = fixture.debugElement.query(By.css('#color-square-lightness'));
    drawSpy = spyOn(component, 'draw').and.callThrough();
    lightnessChangedSpy = spyOn(component.lightnessChanged, 'emit').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();
    drawSpy.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should draw indicator on draw', () => {
    const drawIndicatorSpy = spyOn(component, 'drawIndicator');
    component.draw();
    expect(drawIndicatorSpy).toHaveBeenCalled();
  });

  it('calls onMouseDown when mouse is down', () => {
    const mouseDownSpy = spyOn(component, 'onMouseDown').and.callThrough();
    colorLightnessElement.triggerEventHandler('mousedown', { offsetX: 0, offsetY: 40 });

    expect(mouseDownSpy).toHaveBeenCalled();
  });

  it('emits lightnessChanged on mouse down', () => {
    component.onMouseDown({ offsetY: 40 } as MouseEvent);

    fixture.detectChanges();

    expect(lightnessChangedSpy).toHaveBeenCalledWith(40 / 300);
  });

  it('calls onMouseMove when mouse is moved', () => {
    const mouseMoveSpy = spyOn(component, 'onMouseMove').and.callThrough();
    colorLightnessElement.triggerEventHandler('mousemove', { offsetX: 50, offsetY: 40 });

    expect(mouseMoveSpy).toHaveBeenCalled();
  });

  it('emits lightnessChanged on mouse move if mouse is down', () => {
    component.onMouseDown({ offsetY: 100 } as MouseEvent);
    component.onMouseMove({ offsetY: 40 } as MouseEvent);

    fixture.detectChanges();

    expect(lightnessChangedSpy).toHaveBeenCalledWith(40 / 300);
  });

  it('does not emit lightnessChanged on mouse move if mouse is not down', () => {
    component.onMouseMove({ offsetY: 40 } as MouseEvent);
    fixture.detectChanges();

    expect(lightnessChangedSpy).not.toHaveBeenCalled();
  });

  it('detects mouse up event', () => {
    const mouseUpSpy = spyOn(component, 'onMouseUp').and.callThrough();
    window.dispatchEvent(new Event('mouseup'));
    expect(mouseUpSpy).toHaveBeenCalled();
  });

  it('does not emit lightnessChanged on mouse move if mouse has been released', () => {
    component.onMouseDown({ offsetY: 100 } as MouseEvent);
    component.onMouseUp();
    component.onMouseMove({ offsetY: 40 } as MouseEvent);

    expect(lightnessChangedSpy).toHaveBeenCalledTimes(1);
    expect(lightnessChangedSpy).toHaveBeenCalledWith(100 / 300);
  });
});
