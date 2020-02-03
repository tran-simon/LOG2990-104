import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ColorLightnessComponent} from 'src/app/components/shared/color-picker/color-lightness/color-lightness.component';
import {CustomInputComponent} from 'src/app/components/shared/inputs/custom-input/custom-input.component';
import {HexInputComponent} from 'src/app/components/shared/inputs/hex-input/hex-input.component';
import {NumberInputComponent} from 'src/app/components/shared/inputs/number-input/number-input.component';

import {ColorPickerComponent} from './color-picker.component';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
      declarations: [ColorPickerComponent, ColorLightnessComponent, NumberInputComponent, CustomInputComponent, HexInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
