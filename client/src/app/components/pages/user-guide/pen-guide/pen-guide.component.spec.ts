import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PenGuideComponent } from 'src/app/components/pages/user-guide/pen-guide/pen-guide.component';
import { SharedModule } from '../../../shared/shared.module';

describe('PenGuideComponent', () => {
  let component: PenGuideComponent;
  let fixture: ComponentFixture<PenGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PenGuideComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
