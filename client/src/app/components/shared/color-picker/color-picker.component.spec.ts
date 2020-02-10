import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorLightnessComponent } from 'src/app/components/shared/color-picker/color-lightness/color-lightness.component';
import { CustomInputComponent } from 'src/app/components/shared/inputs/custom-input/custom-input.component';
import { HexInputComponent } from 'src/app/components/shared/inputs/hex-input/hex-input.component';
import { NumberInputComponent } from 'src/app/components/shared/inputs/number-input/number-input.component';

import { ColorPickerComponent } from './color-picker.component';
import Spy = jasmine.Spy;

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;
  let drawSpy: Spy;
  let colorSquareElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
      declarations: [ColorPickerComponent, ColorLightnessComponent, NumberInputComponent, CustomInputComponent, HexInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;

    component.size = 500;

    colorSquareElement = fixture.debugElement.query(By.css('#color-square'));
    drawSpy = spyOn(component, 'draw').and.callThrough();

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

  it('should update on lightness changed', () => {
    const colorLightnessComponent = fixture.debugElement.query(By.directive(ColorLightnessComponent)).componentInstance;
    const lightnessChangedSpy = spyOn(component, 'lightnessChanged').and.callThrough();
    const l = 0.4;

    colorLightnessComponent.lightnessChanged.emit(l);
    fixture.detectChanges();

    expect(lightnessChangedSpy).toHaveBeenCalledWith(l);
    expect(component.color.l).toBe(l);
    expect(drawSpy).toHaveBeenCalled();
  });

  it('should update on RGB inputs change', () => {
    const redColorInputComponent: HexInputComponent = fixture.debugElement.query(By.css('#red-color-input')).componentInstance;
    const greenColorInputComponent: HexInputComponent = fixture.debugElement.query(By.css('#green-color-input')).componentInstance;
    const blueColorInputComponent: HexInputComponent = fixture.debugElement.query(By.css('#blue-color-input')).componentInstance;
    const colorChangeSpy = spyOn(component, 'colorChange').and.callThrough();

    redColorInputComponent.onBlur('11');
    fixture.detectChanges();
    expect(colorChangeSpy).toHaveBeenCalledWith('11', 'r');

    greenColorInputComponent.onBlur('22');
    fixture.detectChanges();
    expect(colorChangeSpy).toHaveBeenCalledWith('22', 'g');

    blueColorInputComponent.onBlur('33');
    fixture.detectChanges();
    expect(colorChangeSpy).toHaveBeenCalledWith('33', 'b');

    expect(component.color.hex).toEqual('112233');
    expect(drawSpy).toHaveBeenCalledTimes(3);
  });

  it('should update on hex color input change', () => {
    const hexColorInputComponent: HexInputComponent = fixture.debugElement.query(By.css('#hex-color-input')).componentInstance;
    const hexChangeSpy = spyOn(component, 'hexChange').and.callThrough();
    const colorHex = 'ff22ff';

    hexColorInputComponent.onBlur(colorHex);
    fixture.detectChanges();

    expect(hexChangeSpy).toHaveBeenCalledWith(colorHex);
    expect(component.color.hex).toEqual(colorHex);
    expect(drawSpy).toHaveBeenCalled();
  });

  it('calls onMouseDown when mouse is down', () => {
    const mouseDownSpy = spyOn(component, 'onMouseDown').and.callThrough();
    colorSquareElement.triggerEventHandler('mousedown', { offsetX: 50, offsetY: 40 });

    expect(mouseDownSpy).toHaveBeenCalled();
  });

  it('can draw on mouse down', () => {
    component.onMouseDown({ offsetX: 50, offsetY: 40 } as MouseEvent);

    fixture.detectChanges();

    const h = (50 / 500) * 360;
    const s = 40 / 500;
    expect(component.color.h).toEqual(h);
    expect(component.color.s).toEqual(s);
    expect(drawSpy).toHaveBeenCalled();
  });

  it('calls onMouseMove when mouse is moved', () => {
    const mouseMoveSpy = spyOn(component, 'onMouseMove').and.callThrough();
    colorSquareElement.triggerEventHandler('mousemove', { offsetX: 50, offsetY: 40 });

    expect(mouseMoveSpy).toHaveBeenCalled();
  });

  it('can draw on mouse move if mouse is down', () => {
    component.onMouseDown({ offsetX: 100, offsetY: 100 } as MouseEvent);
    component.onMouseMove({ offsetX: 50, offsetY: 40 } as MouseEvent);

    fixture.detectChanges();

    const h = (50 / 500) * 360;
    const s = 40 / 500;
    expect(component.color.h).toEqual(h);
    expect(component.color.s).toEqual(s);
    expect(drawSpy).toHaveBeenCalledTimes(2);
  });

  it('does not draw on mouse move if mouse is not down', () => {
    const mouseMoveSpy = spyOn(component, 'onMouseMove').and.callThrough();
    component.onMouseMove({ offsetX: 50, offsetY: 40 } as MouseEvent);
    fixture.detectChanges();

    expect(drawSpy).not.toHaveBeenCalled();
    expect(mouseMoveSpy).toHaveBeenCalled();
  });

  it('detects mouse up event', () => {
    const mouseUpSpy = spyOn(component, 'onMouseUp').and.callThrough();
    window.dispatchEvent(new Event('mouseup'));
    expect(mouseUpSpy).toHaveBeenCalled();
  });

  it('does not draw on mouse move if mouse has been released', () => {
    const mouseMoveSpy = spyOn(component, 'onMouseMove').and.callThrough();

    component.onMouseDown({ offsetX: 100, offsetY: 100 } as MouseEvent);
    component.onMouseUp();
    component.onMouseMove({ offsetX: 50, offsetY: 40 } as MouseEvent);

    const h = (100 / 500) * 360;
    const s = 100 / 500;
    expect(component.color.h).toEqual(h);
    expect(component.color.s).toEqual(s);
    expect(drawSpy).toHaveBeenCalledTimes(1);
    expect(mouseMoveSpy).toHaveBeenCalled();
  });
});
