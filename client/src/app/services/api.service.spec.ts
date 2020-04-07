// tslint:disable: no-string-literal
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Drawing } from '@models/drawing';
import { of } from 'rxjs';
import { APIService } from './api.service';

describe('APIService', () => {
  let apiService: APIService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }),
  );

  beforeEach(() => {
    apiService = TestBed.get(APIService);
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should get call http get on getAllDrawings', async () => {
    const getSpy = spyOn(apiService['http'], 'get').and.returnValue(of(Drawing));

    apiService.getAllDrawings().then(() => {
      expect(getSpy).toHaveBeenCalled();
    });
  });

  it('should get call http post on uploadDrawing', async () => {
    const postSpy = spyOn(apiService['http'], 'post').and.returnValue(of(Drawing));

    const drawing = new Drawing('test drawing', [], '', '', 0, 0, 'www');

    apiService.uploadDrawing(drawing).then(() => {
      expect(postSpy).toHaveBeenCalled();
    });
  });

  it('should get call http get on searchDrawings', async () => {
    const getSpy = spyOn(apiService['http'], 'get').and.returnValue(of(Drawing));

    apiService.searchDrawings('testname', 'testtag').then(() => {
      expect(getSpy).toHaveBeenCalled();
    });
  });

  it('should get call http delete on deleteDrawings', async () => {
    const deleteSpy = spyOn(apiService['http'], 'delete').and.returnValue(of(Drawing));

    apiService.deleteDrawing('testid').then(() => {
      expect(deleteSpy).toHaveBeenCalled();
    });
  });
});
