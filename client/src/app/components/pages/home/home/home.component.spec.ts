import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateDrawingModalComponent } from 'src/app/components/pages/home/create-drawing-modal/create-drawing-modal.component';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { SharedModule } from '../../../shared/shared.module';

import { HomeComponent } from './home.component';
import createSpyObj = jasmine.createSpyObj;

import Spy = jasmine.Spy;

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dialogOpenSpy: Spy;
  let routerSpy = createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [HomeComponent, CreateDrawingModalComponent],
      providers: [
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [CreateDrawingModalComponent] } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    dialogOpenSpy = spyOn(component.dialog, 'open').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openCreateModal on create button clicked', () => {
    const openCreateModalSpy = spyOn(component, 'openCreateModal');
    fixture.debugElement.nativeElement.querySelector('#btn-create').click();
    expect(openCreateModalSpy).toHaveBeenCalled();
  });

  it('should open modal when openCreateModal is called', () => {
    component.openCreateModal();
    expect(dialogOpenSpy).toHaveBeenCalled();
  });

  it('should not open modal if already opened', () => {
    component.openCreateModal();
    component.openCreateModal();
    expect(dialogOpenSpy).toHaveBeenCalledTimes(1);
  });

  it('should call openPage on guide button clicked', () => {
    const openPageSpy = spyOn(component, 'openPage');
    fixture.debugElement.nativeElement.querySelector('#btn-guide').click();
    expect(openPageSpy).toHaveBeenCalledWith('help');
  });

  it('should call openGallery on gallery button clicked', () => {
    const openGallerySpy = spyOn(component, 'openGallery');
    fixture.debugElement.nativeElement.querySelector('#btn-gallery').click();
    expect(openGallerySpy).toHaveBeenCalled();
  });

  it('should route', () => {
    component.openPage('test');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['test']);
  });

  /* keyboard shortcuts */

  it('should handle keyboard event', () => {
    const keyDownSpy = spyOn(KeyboardListener, 'keyDown');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

    expect(keyDownSpy).toHaveBeenCalled();
  });

  it('can open modal with keyboard shortcut', () => {
    const openCreateModalSpy = spyOn(component, 'openCreateModal');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', ctrlKey: true }));
    expect(openCreateModalSpy).toHaveBeenCalled();
  });

  it('can open gallery with keyboard shortcut', () => {
    const openGallerySpy = spyOn(component, 'openGallery');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'g', ctrlKey: true }));
    expect(openGallerySpy).toHaveBeenCalled();
  });
});
