import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomInputComponent } from './custom-input.component';

describe('CustomInputComponent', () => {
  let component: CustomInputComponent;
  let fixture: ComponentFixture<CustomInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
      declarations: [CustomInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    CustomInputComponent.id = 0;
    fixture = TestBed.createComponent(CustomInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set input id', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#custom-input-0');
    expect(input).toBeDefined();
    expect(input).not.toBeNull();
  });

  it('should not return an error when no validators are given', () => {
    component.required = false;
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.errors).toEqual([]);
  });

  it('should return custom error message', () => {
    component.errorMessages.ERROR_NAME = 'ERROR_MESSAGE';
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.getErrorMessage('ERROR_NAME')).toEqual('ERROR_MESSAGE');
  });

  it('should output value onBlur', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#custom-input-0');
    expect(input).not.toBeNull();

    component.valueChange.subscribe((value: string) => {
      expect(value).toEqual('VALUE');
    });

    input.focus();
    input.value = 'VALUE';
    input.blur();
  });

  it('can format value', () => {
    component.format = (v) => v.toUpperCase();
    component.value = 'test';

    component.ngOnChanges();
    expect(component.value).toEqual('TEST');
  });
});
