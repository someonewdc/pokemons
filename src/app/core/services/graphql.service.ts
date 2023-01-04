import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_URL_TOKEN } from '@app/core';

@Injectable({ providedIn: 'root' })
export class GraphQlService {
  private http = inject(HttpClient);
  private API_URL = inject(API_URL_TOKEN);

  public query<T>(options: {
    query: string;
    variables?: { [key: string]: any };
  }): Observable<T> {
    return this.http
      .post<{ data: T }>(`${this.API_URL}/graphql`, {
        query: options.query,
        variables: options.variables,
      })
      .pipe(map(({ data }) => data));
  }

  public mutate<T>(options: {
    mutation: string;
    variables?: { [key: string]: any };
  }): Observable<any> {
    return this.http
      .post<{ data: T }>(`${this.API_URL}/graphql`, {
        query: options.mutation,
        variables: options.variables,
      })
      .pipe(map(({ data }) => data));
  }
}
