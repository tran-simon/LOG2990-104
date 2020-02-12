import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject3Component } from 'src/app/components/pages/user-guide/subject3/subject3.component';
import { SharedModule } from '../../../shared/shared.module';

describe('Sujet3Component', () => {
  let component: Subject3Component;
  let fixture: ComponentFixture<Subject3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [Subject3Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Subject3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
