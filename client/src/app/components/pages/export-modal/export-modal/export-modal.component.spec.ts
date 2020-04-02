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
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import { ExportModalComponent } from './export-modal.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('ExportModalComponent', () => {
  // let component: ExportModalComponent;
  let fixture: ComponentFixture<ExportModalComponent>;
  const dialogRefCloseSpy = createSpy('close');
  let domSanitizer: SpyObj<DomSanitizer>;
  // let imageExportService: ImageExportService;

  beforeEach(async(() => {
    const editorService = new EditorService(new ColorsService());
    editorService.view = {
      svg: createSpyObj('svg', ['appendChild', 'removeChild']),
    } as DrawingSurfaceComponent;

    domSanitizer = createSpyObj<DomSanitizer>('domSanitizer', ['bypassSecurityTrustResourceUrl', 'sanitize']);
    // imageExportService = createSpyObj<ImageExportService>('imageExportService', ['exportSVGElement']);

    TestBed.configureTestingModule({
      imports: [SharedModule, EditorModule],
      declarations: [ExportModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: dialogRefCloseSpy } },
        { provide: EditorService, useValue: editorService },
        { provide: DomSanitizer, useValue: domSanitizer },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [ExportModalComponent] } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportModalComponent);
    // component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
