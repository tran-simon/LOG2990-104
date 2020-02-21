/* tslint:disable:no-string-literal */
import { ElementRef } from '@angular/core';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import { Ellipse } from '../models/shapes/ellipse';
import { Line } from '../models/shapes/line';
import { Rectangle } from '../models/shapes/rectangle';
import { ToolType } from '../models/tools/tool';
import { ColorsService } from './colors.service';
import { EditorService } from './editor.service';

describe('EditorService', () => {
  let service: EditorService;
  let line: Line;
  let rectangle: Rectangle;
  let nativeElementSpyObj: SpyObj<any>;
  let view: ElementRef;

  beforeEach(() => {
    service = new EditorService(new ColorsService());
    line = new Line();
    rectangle = new Rectangle();
    nativeElementSpyObj = createSpyObj('nativeElement', ['removeChild', 'appendChild']);
    view = { nativeElement: nativeElementSpyObj };
    service.view = view;

    service['shapesBuffer'] = [rectangle, rectangle];
    // @ts-ignore
    service['shapes'] = [line];
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
    const shape = new Rectangle();

    EditorService.removeShapeFromView(view, shape);
    expect(nativeElementSpyObj.removeChild).toHaveBeenCalledWith(shape.svgNode);
  });

  it('can add shape to the view', () => {
    const shape = new Rectangle();

    EditorService.addShapeToView(view, shape);
    expect(nativeElementSpyObj.appendChild).toHaveBeenCalledWith(shape.svgNode);
  });

  it('updates shapes and clears buffer on applyShapeBuffer', () => {
    const clearShapesBufferSpy = spyOn(service, 'clearShapesBuffer');

    service.applyShapesBuffer();

    expect(service['shapesBuffer']).toEqual([]);
    expect(service.shapes).toEqual([line, rectangle, rectangle]);
    expect(clearShapesBufferSpy).toHaveBeenCalledTimes(1);
  });

  it('clears shape buffer', () => {
    service.clearShapesBuffer();
    expect(service['shapesBuffer'].length).toEqual(0);
    expect(service['previewShapes'].length).toEqual(0);
  });

  it('removes the shapes that were in the buffer from the view on clearShapesBuffer', () => {
    const removeShapeFromViewSpy = spyOn(EditorService, 'removeShapeFromView');
    service.addPreviewShape(line);

    service.clearShapesBuffer();

    expect(removeShapeFromViewSpy).toHaveBeenCalledTimes(3);
    expect(removeShapeFromViewSpy).toHaveBeenCalledWith(view, rectangle);
    expect(removeShapeFromViewSpy).toHaveBeenCalledWith(view, line);
  });

  it('updates view on addPreviewShape', () => {
    const addShapeToViewSpy = spyOn(EditorService, 'addShapeToView');

    service.addPreviewShape(line);

    expect(addShapeToViewSpy).toHaveBeenCalledWith(view, line);
    expect(service['previewShapes']).toEqual([line]);
  });

  it('updates view on addShapeToBuffer', () => {
    const addShapeToViewSpy = spyOn(EditorService, 'addShapeToView');
    const ellipse = new Ellipse();

    service.addShapeToBuffer(ellipse);

    expect(service['shapes']).toEqual([line]);
    expect(service['shapesBuffer']).toEqual([rectangle, rectangle, ellipse]);
    expect(addShapeToViewSpy).toHaveBeenCalledWith(view, ellipse);
  });
});
