/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HamlaServiceService } from './hamla-service.service';

describe('Service: HamlaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HamlaServiceService]
    });
  });

  it('should ...', inject([HamlaServiceService], (service: HamlaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
