import { TestBed } from '@angular/core/testing';

import { AuthServerProvider } from './auth.service';

describe('AuthServerProvider', () => {
  let service: AuthServerProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServerProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
