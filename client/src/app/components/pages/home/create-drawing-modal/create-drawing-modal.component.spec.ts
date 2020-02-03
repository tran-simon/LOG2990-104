import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../shared/shared.module';

import { CreateDrawingModalComponent } from './create-drawing-modal.component';

describe('CreateDrawingModalComponent', () => {
  let component: CreateDrawingModalComponent;
  let fixture: ComponentFixture<CreateDrawingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [CreateDrawingModalComponent],
      providers: [{provide: MatDialogRef, useValue: {}}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDrawingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
