import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LineGuideComponent } from 'src/app/components/pages/user-guide/line-guide/line-guide.component';
import { SharedModule } from '../../../shared/shared.module';

describe('LineGuideComponent', () => {
  let component: LineGuideComponent;
  let fixture: ComponentFixture<LineGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [LineGuideComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
