/* tslint:disable:no-string-literal */
import { ElementRef } from '@angular/core';
import { Line } from '../models/shapes/line';
import { Rectangle } from '../models/shapes/rectangle';
import { ToolType } from '../models/tools/tool';
import { ColorsService } from './colors.service';
import { EditorService } from './editor.service';
import createSpyObj = jasmine.createSpyObj;

fdescribe('EditorService', () => {
  let service: EditorService;

  beforeEach(() => {
    service = new EditorService(new ColorsService());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.colorsService).toBeTruthy();
  });

  it('creates new tools at initialisation', () => {
    expect(service.tools.size).not.toEqual(0);
    for (const key of Object.values(ToolType)) {
      const tool = service.tools.get(key);
      expect(tool).toBeDefined();
      // @ts-ignore
      expect(tool.toolProperties.type).toEqual(key);
    }
  });

  it('can remove shape from the view', () => {
    const nativeElementSpyObj = createSpyObj('nativeElement', ['removeChild', 'appendChild']);
    const view: ElementRef = { nativeElement: nativeElementSpyObj };
    const shape = new Rectangle();

    EditorService.removeShapeFromView(view, shape);
    expect(nativeElementSpyObj.removeChild).toHaveBeenCalledWith(shape.svgNode);
  });

  it('can add shape to the view', () => {
    const viewNativeElementSpyObj = createSpyObj('nativeElement', ['removeChild', 'appendChild']);
    const view: ElementRef = { nativeElement: viewNativeElementSpyObj };
    const shape = new Rectangle();

    EditorService.addShapeToView(view, shape);
    expect(viewNativeElementSpyObj.appendChild).toHaveBeenCalledWith(shape.svgNode);
  });

  it('updates shapes and clears buffer on applyShapeBuffer', () => {
    const clearShapesBufferSpy = spyOn(service, 'clearShapesBuffer');
    const line = new Line();
    const rectangle = new Rectangle();
    service['shapesBuffer'] = [rectangle, rectangle];
    // @ts-ignore
    service['shapes'] = [line];

    service.applyShapesBuffer();

    expect(service.shapes).toEqual([line, rectangle, rectangle]);
    expect(clearShapesBufferSpy).toHaveBeenCalledTimes(1);
  });
});
