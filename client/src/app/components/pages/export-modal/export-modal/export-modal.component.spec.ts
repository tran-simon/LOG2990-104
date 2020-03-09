/* tslint:disable:no-string-literal */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';

import createSpy = jasmine.createSpy;
import { SharedModule } from 'src/app/components/shared/shared.module';
import { ColorsService } from 'src/app/services/colors.service';
import { EditorService } from 'src/app/services/editor.service';
import { EditorModule } from '../../editor/editor.module';
import { ExportModalComponent } from './export-modal.component';
import createSpyObj = jasmine.createSpyObj;
import Spy = jasmine.Spy;
import SpyObj = jasmine.SpyObj;

describe('ExportModalComponent', () => {
  let component: ExportModalComponent;
  let fixture: ComponentFixture<ExportModalComponent>;
  const dialogRefCloseSpy = createSpy('close');
  let createDataURLSpy: Spy;
  let exportSVGElementSpy: Spy;
  let exportImageElement: Spy;
  let domSanitizer: SpyObj<DomSanitizer>;

  beforeEach(async(() => {
    const editorService = new EditorService(new ColorsService());
    editorService.view = {
      svg: createSpyObj('svg', ['appendChild', 'removeChild'])
    } as DrawingSurfaceComponent;

    createDataURLSpy = spyOn(editorService, 'createDataURL');
    exportSVGElementSpy = spyOn(editorService, 'exportSVGElement');
    exportImageElement = spyOn(editorService, 'exportImageElement');

    domSanitizer = createSpyObj<DomSanitizer>('domSanitizer', ['bypassSecurityTrustResourceUrl', 'sanitize']);

    TestBed.configureTestingModule({
      imports: [SharedModule, EditorModule],
      declarations: [
        ExportModalComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: dialogRefCloseSpy } },
        {provide: EditorService, useValue: editorService},
        {provide: DomSanitizer, useValue: domSanitizer},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportModalComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create data url on previewURL', () => {
    createDataURLSpy.calls.reset();
    component.previewURL();
    expect(createDataURLSpy).toHaveBeenCalled();
  });

  it('should call export svg element on submit with svg extension', () => {
    component.name = 'NAME';
    component.selectedExtension = 'svg';
    component.submit();
    expect(exportSVGElementSpy).toHaveBeenCalled();
  });

  it('should call export image element on submit with other extension', () => {
    component.name = 'NAME';
    component.selectedExtension = 'EXTENsION';
    component.submit();
    expect(exportImageElement).toHaveBeenCalled();
  });
});
