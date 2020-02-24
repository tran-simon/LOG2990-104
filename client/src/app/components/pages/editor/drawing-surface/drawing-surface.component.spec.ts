/*tslint:disable:no-string-literal*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { Rectangle } from 'src/app/models/shapes/rectangle';

import { DrawingSurfaceComponent } from './drawing-surface.component';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('DrawingSurfaceComponent', () => {
  let component: DrawingSurfaceComponent;
  let fixture: ComponentFixture<DrawingSurfaceComponent>;
  let nativeElementSpyObj: SpyObj<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [DrawingSurfaceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingSurfaceComponent);
    component = fixture.componentInstance;
    nativeElementSpyObj = createSpyObj('nativeElement', ['removeChild', 'appendChild']);
    fixture.detectChanges();
    component['_svg'] = nativeElementSpyObj;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can remove shape from the view', () => {
    const shape = new Rectangle();
    component.removeShape(shape);
    expect(nativeElementSpyObj.removeChild).toHaveBeenCalledWith(shape.svgNode);
  });

  it('can add shape to the view', () => {
    const shape = new Rectangle();

    component.addShape(shape);
    expect(nativeElementSpyObj.appendChild).toHaveBeenCalledWith(shape.svgNode);
  });
});
