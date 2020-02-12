import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject1Component } from 'src/app/components/pages/user-guide/subject1/subject1.component';
import { SharedModule } from '../../../shared/shared.module';

describe('Sujet1Component', () => {
  let component: Subject1Component;
  let fixture: ComponentFixture<Subject1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [Subject1Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Subject1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
