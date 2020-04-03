import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
// import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ChooseExportSaveModalComponent } from './choose-export-save-modal.component';
// import createSpyObj = jasmine.createSpyObj;
import createSpy = jasmine.createSpy;

fdescribe('ChooseExportSaveModal', () => {
  let component: ChooseExportSaveModalComponent;
  let fixture: ComponentFixture<ChooseExportSaveModalComponent>;
  const dialogRefCloseSpy = createSpy('close');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ChooseExportSaveModalComponent],
      providers: [{ provide: MatDialogRef, useValue: { close: dialogRefCloseSpy } }],
    })
      .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [ChooseExportSaveModalComponent] } })
      .compileComponents();
  }));
  beforeEach(() => {
    (fixture = TestBed.createComponent(ChooseExportSaveModalComponent)), (component = fixture.componentInstance);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
