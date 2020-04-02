/* tslint:disable:no-string-literal no-magic-numbers */
import { TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;
import { DomSanitizer } from '@angular/platform-browser';
import { DrawingSurfaceComponent } from '../components/pages/editor/drawing-surface/drawing-surface.component';
import SpyObj = jasmine.SpyObj;
import { FilterType } from '../components/pages/export-modal/filter-type.enum';
import { SharedModule } from '../components/shared/shared.module';
// import { ToolType } from 'src/app/models/tools/tool-type.enum';
// import { Ellipse } from '../models/shapes/ellipse';
import { Line } from '../models/shapes/line';
import { Rectangle } from '../models/shapes/rectangle';
import { ColorsService } from './colors.service';
import { EditorService } from './editor.service';
import { ImageExportService } from './image-export.service';

describe('EditorService', () => {
  let component: ImageExportService;
  let service: EditorService;
  let line: Line;
  let rectangle: Rectangle;
  let domSanitizer: SpyObj<DomSanitizer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [DrawingSurfaceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    service = new EditorService(new ColorsService());
    line = new Line();
    rectangle = new Rectangle();
    service.view = createSpyObj('view', ['addShape', 'removeShape']);

    service['shapesBuffer'] = [rectangle, rectangle];
    // @ts-ignore
    service['shapes'] = [line];
    domSanitizer = createSpyObj<DomSanitizer>('domSanitizer', ['bypassSecurityTrustResourceUrl', 'sanitize']);
    component = new ImageExportService(domSanitizer);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(service).toBeTruthy();
    expect(service.colorsService).toBeTruthy();
  });
  it('should call addFilter, safeURL and removeFilter', () => {
    const addFilterSpy = spyOn(component, 'addFilter');
    const safeURLSpy = spyOn(component, 'safeURL');
    const removeFilterSpy = spyOn(component, 'removeFilter');
    const filter = FilterType.INVERT;
    component.exportSVGElement(service.view, filter);
    expect(addFilterSpy).toHaveBeenCalledWith(service.view, filter);
    expect(safeURLSpy).toHaveBeenCalledWith(service.view);
    expect(removeFilterSpy).toHaveBeenCalledWith(service.view);
  });
  it('should return safe URL', () => {
    const filter = FilterType.INVERT;
    const returnValue = component.exportSVGElement(service.view, filter);
    expect(returnValue).toEqual(component.safeURL(service.view));
  });
  it('should add filter when addFilter is called', () => {
    const surface = new DrawingSurfaceComponent();
    surface.svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
    const filter = FilterType.BLACKWHITE;
    component.addFilter(surface, filter);
    expect(surface.svg.getAttribute('filter')).toEqual('greyscale(100%)');
  });
});

// /* tslint:disable:no-string-literal no-magic-numbers */
// import { TestBed } from '@angular/core/testing';
// import { DrawingSurfaceComponent } from '../components/pages/editor/drawing-surface/drawing-surface.component';
// // import { ExtensionType } from '../components/pages/export-modal/extension-type.enum';
// // import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// // import { from } from 'rxjs';
// // import { DrawingSurfaceComponent } from '../components/pages/editor/drawing-surface/drawing-surface.component';
// import { FilterType } from '../components/pages/export-modal/filter-type.enum';
// import { SharedModule } from '../components/shared/shared.module';
// // import createSpyObj = jasmine.createSpyObj;
// import { Line } from '../models/shapes/line';
// import { Rectangle } from '../models/shapes/rectangle';
// import { ImageExportService } from '../services/image-export.service';
// import { ColorsService } from './colors.service';
// import { EditorService } from './editor.service';

// describe('ImageExportService', () => {
//   let service: ImageExportService;
//   let editor: EditorService;
//   let line: Line;
//   let rectangle: Rectangle;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [SharedModule],
//       declarations: [DrawingSurfaceComponent],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     service = TestBed.get(ImageExportService);
//     editor = new EditorService(new ColorsService());
//     line = new Line();
//     rectangle = new Rectangle();
//     // editor.view = createSpyObj('view', ['addShape', 'removeShape']);
//     editor['shapesBuffer'] = [rectangle, rectangle];
//     // @ts-ignore
//     service['shapes'] = [line];
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//     expect(editor).toBeTruthy();
//     expect(editor.colorsService).toBeTruthy();
//   });
//   it('should call addFilter, safeURL and removeFilter when exporting svg file', () => {
//     const addFilterSpy = spyOn(service, 'addFilter');
//     const removeFilterSpy = spyOn(service, 'removeFilter');
//     const extension = 'svg';
//     const filter: FilterType = FilterType.BLACKWHITE;
//     editor.addPreviewShape(line);

//     service.exportImageElement(editor.view, extension, filter);
//     expect(addFilterSpy).toHaveBeenCalledWith(editor.view, filter);
//     expect(removeFilterSpy).toHaveBeenCalledWith(editor.view);
//   });
//   it('should return safe data URL when exporting SVG', () => {
//     const extension = 'svg';
//     const filter: FilterType = FilterType.BLACKWHITE;
//     editor.addPreviewShape(line);
//     const returnValue = service.exportImageElement(editor.view, extension, filter);
//     expect(returnValue.toString()).toEqual(service.safeURL(editor.view).toString());
//   });
// });
