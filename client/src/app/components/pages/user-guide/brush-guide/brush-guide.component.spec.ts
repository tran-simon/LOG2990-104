import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrushGuideComponent } from 'src/app/components/pages/user-guide/brush-guide/brush-guide.component';
import { SharedModule } from '../../../shared/shared.module';

describe('BrushGuideComponent', () => {
  let component: BrushGuideComponent;
  let fixture: ComponentFixture<BrushGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [BrushGuideComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
