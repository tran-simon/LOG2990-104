import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject2Component } from 'src/app/components/pages/user-guide/subject2/subject2.component';
import { SharedModule } from '../../../shared/shared.module';

describe('Sujet2Component', () => {
  let component: Subject2Component;
  let fixture: ComponentFixture<Subject2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [Subject2Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Subject2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
