import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorGuideComponent } from 'src/app/components/pages/user-guide/color-guide/color-guide.component';
import { SharedModule } from '../../../shared/shared.module';

describe('ColorGuideComponent', () => {
  let component: ColorGuideComponent;
  let fixture: ComponentFixture<ColorGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ColorGuideComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
