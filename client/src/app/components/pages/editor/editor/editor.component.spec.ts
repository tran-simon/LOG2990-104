import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Color } from 'src/app/utils/color/color';
import { SharedModule } from '../../../shared/shared.module';
import { DrawingSurfaceComponent } from '../drawing-surface/drawing-surface.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [EditorComponent, DrawingSurfaceComponent, ToolbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changes background color on event emitted from toolbar', () => {
    const changeBackgroundSpy = spyOn(component, 'changeBackground').and.callThrough();
    const toolbar: ToolbarComponent = fixture.debugElement.query(By.css('#toolbar')).componentInstance;
    toolbar.editorBackgroundChanged.emit(Color.RED);
    expect(component.drawingSurface.color).toEqual(Color.RED);
    expect(changeBackgroundSpy).toHaveBeenCalled();
  });
});
