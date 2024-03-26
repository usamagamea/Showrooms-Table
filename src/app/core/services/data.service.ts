import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl, nestedUrl } from 'src/app/auth/api/endPoint';
import { CarShowroom } from '../models/interface/CarShowroom';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly #http = inject(HttpClient);

  getData(): Observable<CarShowroom> {
    return this.#http.get<CarShowroom>(apiUrl);
  }

  getNestedData(id: number): Observable<any> {
    const url = `${nestedUrl}/${id}`;
    return this.#http.get<any>(url);
  }
}
