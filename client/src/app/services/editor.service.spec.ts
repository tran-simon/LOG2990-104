/* tslint:disable:no-string-literal no-magic-numbers */
import { TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;
import { Drawing } from '@models/drawing';
import { BaseShape } from '@models/shapes/base-shape';
import { Ellipse } from '@models/shapes/ellipse';
import { Line } from '@models/shapes/line';
import { Polygon } from '@models/shapes/polygon';
import { Rectangle } from '@models/shapes/rectangle';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { CompositeLine } from 'src/app/models/shapes/composite-line';
import { ToolType } from 'src/app/models/tools/tool-type.enum';
import { ColorsService } from './colors.service';
import { EditorService } from './editor.service';

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

  it('can create shape from type', () => {
    const types =[
      'BoundingBox',
      'BrushPath',
      'CompositeLine',
      'CompositeParticle',
      'Ellipse',
      'Line',
      'Path',
      'Polygon',
      'Rectangle',
    ];
    types.forEach((type) => {
      expect(EditorService.createShape(type).constructor.name).toEqual(type);
    });
  });

  it('can export drawing', () => {
    service.shapes.length = 0;
    service.shapes.push(line);
    service.shapes.push(rectangle);
    const result = JSON.parse(service.exportDrawing());
    expect(result.length).toEqual(2);
    expect(result[0].svgNode).toBeFalsy();
    expect(result[0].type).toEqual('Line');
    expect(result[1].type).toEqual('Rectangle');
  });

  it('can import drawing', () => {
    service.shapes.length = 0;
    service.shapes.push(line);
    service.shapes.push(rectangle);
    const api = createSpyObj('api', {getDrawingById: () => {return;}});
    api.getDrawingById = async (id: string) => {
      return Promise.resolve({data: service.exportDrawing()} as Drawing);
    };
    const service2 = new EditorService(new ColorsService());
    service2.importDrawing('', api);
    expect(service2.shapes.values).toEqual(service.shapes.values);
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
    const addShapeSpy = spyOn(service, 'addShapeToBuffer').and.callFake((shape) => {
      addedShapes.push(shape);
    });
    const shapes = [new Rectangle(), new CompositeLine()];
    service.addShapesToBuffer(shapes);
    expect(addShapeSpy).toHaveBeenCalledTimes(2);
    expect(addedShapes).toEqual(shapes);
  });

  it('can remove multiple shapes', () => {
    const removedShapes: BaseShape[] = [];
    const removeShapeSpy = spyOn(service, 'removeShape').and.callFake((shape) => {
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
  it('adds shape to buffer if view is undefined', () => {
    const ellipse = new Ellipse();
    // @ts-ignore
    service.view = undefined;

    service.addShapeToBuffer(ellipse);
    expect(service['shapesBuffer']).toEqual([rectangle, rectangle, ellipse]);
  });

  it('can remove shape from view', () => {
    service.removeShapeFromView(line);

    expect(service.view.removeShape).toHaveBeenCalledWith(line);
  });

  it('can remove shape', () => {
    service.removeShape(line);
    expect(service.shapes.length).toEqual(0);
    expect(service.view.removeShape).toHaveBeenCalledWith(line);
  });

  it('does not remove shape if it is not in the list', () => {
    service.removeShape(new Polygon());
    expect(service.shapes.length).toEqual(1);
    expect(service.view.removeShape).not.toHaveBeenCalled();
  });

  it('can clear selection', () => {
    service.clearSelection();
    expect(service.selectedShapes).toEqual([]);
  });

  it('can find shape by id', () => {
    const rect = new Rectangle();
    rect.svgNode.id = 'ID';
    service['shapes'].push(rect);
    expect(service.findShapeById('ID')).toEqual(rect);
    expect(service.findShapeById('invalid')).toEqual(undefined);
  });

  it('throws an error if findShapeById finds multiple shapes with the same id', () => {
    const ellipse = new Ellipse();
    ellipse.svgNode.id = 'ID';
    const rect = new Rectangle();
    rect.svgNode.id = 'ID';
    service['shapes'].push(rect);
    service['shapes'].push(ellipse);

    expect(() => service.findShapeById('ID')).toThrowError('Shape Id collision error');
  });
});
