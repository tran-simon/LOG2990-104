import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/components/shared/shared.module';

import { RectangleToolbarComponent } from 'src/app/components/pages/editor/toolbar/rectangle-toolbar/rectangle-toolbar.component';
import { EditorService } from '../../../../../services/editor.service';

describe('RectangleToolbarComponent', () => {
  let component: RectangleToolbarComponent;
  let fixture: ComponentFixture<RectangleToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [RectangleToolbarComponent],
      providers: [EditorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
