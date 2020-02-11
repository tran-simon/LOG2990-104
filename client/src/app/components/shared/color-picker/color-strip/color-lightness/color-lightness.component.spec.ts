import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerComponent } from 'src/app/components/shared/color-picker/color-picker.component';
import { AlphaComponent } from 'src/app/components/shared/color-picker/color-strip/alpha/alpha.component';
import { CustomInputComponent } from 'src/app/components/shared/inputs/custom-input/custom-input.component';
import { HexInputComponent } from 'src/app/components/shared/inputs/hex-input/hex-input.component';
import { NumberInputComponent } from 'src/app/components/shared/inputs/number-input/number-input.component';

import { ColorLightnessComponent } from 'src/app/components/shared/color-picker/color-strip/color-lightness/color-lightness.component';
import Spy = jasmine.Spy;

describe('ColorLightnessComponent', () => {
  let component: ColorLightnessComponent;
  let fixture: ComponentFixture<ColorLightnessComponent>;
  let drawSpy: Spy;
  let lightnessChangedSpy: Spy;
  let calculateNewColorSpy: Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
      declarations: [
        ColorPickerComponent,
        AlphaComponent,
        ColorLightnessComponent,
        NumberInputComponent,
        CustomInputComponent,
        HexInputComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorLightnessComponent);
    component = fixture.componentInstance;

    component.isVertical = true;
    drawSpy = spyOn(component, 'draw').and.callThrough();
    lightnessChangedSpy = spyOn(component.colorChanged, 'emit').and.callThrough();
    calculateNewColorSpy = spyOn(component, 'calculateNewColor').and.callThrough();

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

  it('emits lightnessChanged on mouse down', () => {
    component.onMouseDown({ offsetY: 40 } as MouseEvent);

    fixture.detectChanges();

    expect(calculateNewColorSpy).toHaveBeenCalledWith(40 / 300);
  });

  it('emits lightnessChanged on mouse move if mouse is down', () => {
    component.onMouseDown({ offsetY: 100 } as MouseEvent);
    component.onMouseMove({ offsetY: 40 } as MouseEvent);

    fixture.detectChanges();

    expect(calculateNewColorSpy).toHaveBeenCalledWith(40 / 300);
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
    expect(calculateNewColorSpy).toHaveBeenCalledWith(100 / 300);
  });

  it('should have width bigger than height if horizontal', () => {
    component.isVertical = false;
    expect(component.width).toBeGreaterThan(component.height);
  });
});
