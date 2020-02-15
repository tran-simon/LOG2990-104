import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Color } from 'src/app/utils/color/color';

import { ColorHistoryComponent } from './color-history.component';

describe('ColorHistoryComponent', () => {
  let component: ColorHistoryComponent;
  let fixture: ComponentFixture<ColorHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorHistoryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can push color when limit reached', () => {
    for (let i = 0; i < 10; i++) {
      ColorHistoryComponent.push(i % 2 === 0 ? Color.RED : Color.GREEN);
    }
    expect(component.colorHistory[0]).toEqual(Color.RED);
    expect(component.colorHistory[9]).toEqual(Color.GREEN);
    ColorHistoryComponent.push(Color.BLUE);
    expect(component.colorHistory[0]).toEqual(Color.GREEN);
    expect(component.colorHistory[9]).toEqual(Color.BLUE);
  });

  it('emits color selected on button click', () => {
    const colorSelectedSpy = spyOn(component.colorSelectedEvent, 'emit');

    const button: DebugElement = fixture.debugElement.query(By.css('.color-history-button'));

    expect(button).not.toBeUndefined();
    button.nativeElement.click();
    expect(colorSelectedSpy).toHaveBeenCalled();
  });
});
