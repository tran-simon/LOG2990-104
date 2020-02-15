import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject6Component } from 'src/app/components/pages/user-guide/subject6/subject6.component';
import { SharedModule } from '../../../shared/shared.module';

describe('Sujet6Component', () => {
  let component: Subject6Component;
  let fixture: ComponentFixture<Subject6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [Subject6Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Subject6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
