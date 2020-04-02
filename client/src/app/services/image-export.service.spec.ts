/* tslint:disable:no-string-literal no-magic-numbers */
import { TestBed } from '@angular/core/testing';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { from } from 'rxjs';
// import { DrawingSurfaceComponent } from '../components/pages/editor/drawing-surface/drawing-surface.component';
import { FilterType } from '../components/pages/export-modal/filter-type.enum';
import { ImageExportService } from '../services/image-export.service';
import { ColorsService } from './colors.service';
import { EditorService } from './editor.service';
// import createSpyObj = jasmine.createSpyObj;

describe('ImageExportService', () => {
  let service: ImageExportService;
  let editor: EditorService;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    service = TestBed.get(ImageExportService);
    editor = new EditorService(new ColorsService());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call addFilter, safeURL and removeFilter when exporting svg file', () => {
    const addFilterSpy = spyOn(service, 'addFilter');
    const safeURLSpy = spyOn(service, 'safeURL');
    const removeFilterSpy = spyOn(service, 'removeFilter');
    const extension = 'svg';
    const filter: FilterType = FilterType.BLACKWHITE;

    service.exportImageElement(editor.view, extension, filter);
    expect(addFilterSpy).toHaveBeenCalledWith(editor.view, filter);
    expect(safeURLSpy).toHaveBeenCalledWith(editor.view);
    expect(removeFilterSpy).toHaveBeenCalledWith(editor.view);
  });
});
