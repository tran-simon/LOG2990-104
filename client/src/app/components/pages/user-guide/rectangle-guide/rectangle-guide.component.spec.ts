import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RectangleGuideComponent } from 'src/app/components/pages/user-guide/rectangle-guide/rectangle-guide.component';
import { SharedModule } from '../../../shared/shared.module';

describe('RectangleGuideComponent', () => {
  let component: RectangleGuideComponent;
  let fixture: ComponentFixture<RectangleGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [RectangleGuideComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
