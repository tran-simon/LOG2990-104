import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';
import { ExportModalComponent } from './export-modal.component';
import createSpy = jasmine.createSpy;

describe('ExportModalComponent', () => {
  const dialogRefCloseSpy = createSpy('close');
  let component: ExportModalComponent;
  let fixture: ComponentFixture<ExportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ExportModalComponent],
      providers: [{ provide: MatDialogRef, useValue: { close: dialogRefCloseSpy } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should call submit when Save button clicked', () => {
    const submitClickSpy = spyOn(component, 'submit');
    fixture.debugElement.nativeElement.querySelector('#saveButton').click();
    expect(submitClickSpy).toHaveBeenCalledWith(false);
  });
  it('Should call submit when cancel button clicked', () => {
    const submitClickSpy = spyOn(component, 'submit');
    fixture.debugElement.nativeElement.querySelector('#cancelButton').click();
    expect(submitClickSpy).toHaveBeenCalledWith(true);
  });
  it('Should call close dialog when saving drawing', () => {
    component.submit(true);
    expect(component.fullName).toEqual(component.name + '.' + component.selectedExtension);
    expect(dialogRefCloseSpy).toHaveBeenCalledWith(component.fullName);
  });
});
