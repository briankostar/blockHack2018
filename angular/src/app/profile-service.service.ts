import { Injectable } from '@angular/core';
import { PROFILES } from './profiles';

@Injectable()
export class ProfileServiceService {

  constructor() { }

  public getProfiles() {
    return PROFILES;
  }
}
