import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notLoggedUserGuard } from './not-logged-user.guard';

describe('notLoggedUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notLoggedUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
