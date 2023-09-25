import { TestBed } from '@angular/core/testing';

import { ApplicationConfigService } from './application-coonfig.service';

describe('ApplicationCoonfigService', () => {
  let service: ApplicationConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
