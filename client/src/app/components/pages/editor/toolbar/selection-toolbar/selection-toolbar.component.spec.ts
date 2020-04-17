import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '@components/shared/shared.module';
import { EditorService } from '@services/editor.service';
import { SelectionToolbarComponent } from './selection-toolbar.component';

describe('SelectionToolbarComponent', () => {
  let component: SelectionToolbarComponent;
  let fixture: ComponentFixture<SelectionToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [SelectionToolbarComponent],
      providers: [EditorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
