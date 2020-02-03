import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../../shared/shared.module';
import { ToolbarComponent } from './toolbar.component';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [ToolbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go home', () => {
    const spy = spyOn(router, 'navigate');

    component.goHome();

    expect(spy).toHaveBeenCalledWith(['']);
  });

  it('should select the crayon tool', () => {
    component.selectTool(component.tools.Pencil);

    expect(component.selectedTool).toBe(component.tools.Pencil);
  });

  it('should open the drawer when selecting the crayon tool', () => {
    component.selectTool(component.tools.Pencil);

    expect(component.drawer.opened).toBe(true);
  });

  it('should close the drawer when selecting the crayon tool a second time', () => {
    component.selectTool(component.tools.Pencil);
    component.selectTool(component.tools.Pencil);

    expect(component.drawer.opened).toBe(false);
  });

  it('should leave the drawer open when selecting another tool', () => {
    component.selectTool(component.tools.Pencil);
    component.selectTool(component.tools.Brush);

    expect(component.drawer.opened).toBe(true);
  });
});
