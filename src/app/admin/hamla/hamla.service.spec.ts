/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HamlaService } from './hamla.service';

describe('Service: Hamla', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HamlaService]
    });
  });

  it('should ...', inject([HamlaService], (service: HamlaService) => {
    expect(service).toBeTruthy();
  }));
});
