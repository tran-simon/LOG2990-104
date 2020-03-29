import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumPropertyInputComponent } from './enum-property-input.component';

describe('EnumPropertyInputComponent', () => {
  let component: EnumPropertyInputComponent;
  let fixture: ComponentFixture<EnumPropertyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumPropertyInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumPropertyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
