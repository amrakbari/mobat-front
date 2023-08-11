import { TestBed } from '@angular/core/testing';

import { HomePageServiceService } from './home-page-service.service';

describe('HomePageServiceService', () => {
  let service: HomePageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomePageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
