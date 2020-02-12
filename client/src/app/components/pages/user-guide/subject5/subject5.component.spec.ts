import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject5Component } from 'src/app/components/pages/user-guide/subject5/subject5.component';
import { SharedModule } from '../../../shared/shared.module';

describe('Sujet5Component', () => {
  let component: Subject5Component;
  let fixture: ComponentFixture<Subject5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [Subject5Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Subject5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
