import { InjectionToken } from '@angular/core';

export const API_URL_TOKEN = new InjectionToken('api_url', {
  providedIn: 'root',
  factory: () => 'https://api.tcgdex.net/v2',
});
