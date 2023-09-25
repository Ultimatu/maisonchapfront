import { TestBed } from '@angular/core/testing';

import { JwtExpiredInterceptor } from './jwt-expired.interceptor';

describe('JwtExpiredInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtExpiredInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtExpiredInterceptor = TestBed.inject(JwtExpiredInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
