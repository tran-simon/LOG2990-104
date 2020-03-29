import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericPropertyInputComponent } from './numeric-property-input.component';

describe('NumericPropertyInputComponent', () => {
  let component: NumericPropertyInputComponent;
  let fixture: ComponentFixture<NumericPropertyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericPropertyInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericPropertyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
