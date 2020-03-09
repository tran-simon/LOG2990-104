import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { ExportModalComponent } from './export-modal.component';
import createSpy = jasmine.createSpy;

describe('ExportModalComponent', () => {
  const dialogRefCloseSpy = createSpy('close');
  let fixture: ComponentFixture<ExportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ExportModalComponent],
      providers: [{ provide: MatDialogRef, useValue: { close: dialogRefCloseSpy } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportModalComponent);
    fixture.detectChanges();
  });

});
