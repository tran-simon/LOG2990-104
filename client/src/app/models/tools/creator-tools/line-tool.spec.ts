/*tslint:disable:no-string-literal*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { SelectedColorsService } from 'src/app/services/selected-colors.service';
import { LineTool } from './line-tool';

describe('LineTool', () => {
  let lineTool: LineTool;
  let fixture: ComponentFixture<DrawingSurfaceComponent>;
  let surface: DrawingSurfaceComponent;
  let selectedColorsService: SelectedColorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrawingSurfaceComponent],
      providers: [SelectedColorsService],
    }).compileComponents();
  });

  beforeEach(() => {
    selectedColorsService = new SelectedColorsService();
    fixture = TestBed.createComponent(DrawingSurfaceComponent);
    fixture.detectChanges();
    surface = new DrawingSurfaceComponent();
    lineTool = new LineTool(surface, selectedColorsService);
  });

  it('should create an instance', () => {
    expect(lineTool).toBeTruthy();
  });
});
