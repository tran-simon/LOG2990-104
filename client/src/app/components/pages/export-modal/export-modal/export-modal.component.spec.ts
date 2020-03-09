import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';

import createSpy = jasmine.createSpy;
import { SharedModule } from 'src/app/components/shared/shared.module';
import { EditorModule } from '../../editor/editor.module';
import { ExportModalComponent } from './export-modal.component';

fdescribe('ExportModalComponent', () => {
  let component: ExportModalComponent;
  let fixture: ComponentFixture<ExportModalComponent>;
  const dialogRefCloseSpy = createSpy('close');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, EditorModule],
      declarations: [ExportModalComponent],
      providers: [{ provide: MatDialogRef, useValue: { close: dialogRefCloseSpy } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
