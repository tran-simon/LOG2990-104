/* tslint:disable:no-string-literal no-magic-numbers */
import { TestBed } from '@angular/core/testing';
import { BaseShape } from '@models/shapes/base-shape';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { CompositeLine } from 'src/app/models/shapes/composite-line';
import { ToolType } from 'src/app/models/tools/tool-type.enum';
import { Ellipse } from '../models/shapes/ellipse';
import { Line } from '../models/shapes/line';
import { Rectangle } from '../models/shapes/rectangle';
import { ColorsService } from './colors.service';
import { EditorService } from './editor.service';
import createSpyObj = jasmine.createSpyObj;

describe('EditorService', () => {
  let service: EditorService;
  let line: Line;
  let rectangle: Rectangle;

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
    service.view = createSpyObj('view', ['addShape', 'removeShape', 'svg']);

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
    }
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

  it('can add multiple shapes', () => {
    const addedShapes: BaseShape[] = [];
    const addShapeSpy = spyOn(service, 'addShapeToBuffer').and.callFake((shape)=>{
      addedShapes.push(shape);
    });
    const shapes = [new Rectangle(), new CompositeLine()];
    service.addShapesToBuffer(shapes);
    expect(addShapeSpy).toHaveBeenCalledTimes(2);
    expect(addedShapes).toEqual(shapes);
  });

  it('can remove multiple shapes', () => {
    const removedShapes: BaseShape[] = [];
    const removeShapeSpy = spyOn(service, 'removeShape').and.callFake((shape)=>{
    removedShapes.push(shape);
  });
  const shapes = [new Rectangle(), new CompositeLine()];
    service.removeShapes(shapes);
    expect(removeShapeSpy).toHaveBeenCalledTimes(2);
    expect(removedShapes).toEqual(shapes);
  });

  it('removes the shapes that were in the buffer from the view on clearShapesBuffer', () => {
    service.addPreviewShape(line);

    service.clearShapesBuffer();

    expect(service.view.removeShape).toHaveBeenCalledTimes(3);
    expect(service.view.removeShape).toHaveBeenCalledWith(rectangle);
    expect(service.view.removeShape).toHaveBeenCalledWith(line);
  });

  it('updates view on addPreviewShape', () => {
    service.addPreviewShape(line);

    expect(service.view.addShape).toHaveBeenCalledWith(line);
    expect(service['previewShapes']).toEqual([line]);
  });

  it('updates view on addShapeToBuffer', () => {
    const ellipse = new Ellipse();
    service.view.svg.contains = () => false;

    service.addShapeToBuffer(ellipse);

    expect(service['shapes']).toEqual([line]);
    expect(service['shapesBuffer']).toEqual([rectangle, rectangle, ellipse]);
    expect(service.view.addShape).toHaveBeenCalledWith(ellipse);
  });
});
