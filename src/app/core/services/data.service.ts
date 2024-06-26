import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { REST } from 'src/app/auth/api/endPoint';
import { CarShowroom } from '../models/interface/CarShowroom';
import { NestedDetails } from '../models/interface/NestedDetails';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly #http = inject(HttpClient);

  getData(): Observable<CarShowroom> {
    return this.#http.get<CarShowroom>(REST.apiUrl);
  }

  getNestedData(id: number): Observable<NestedDetails> {
    const url = `${REST.nestedUrl}/${id}`;
    return this.#http.get<NestedDetails>(url);
  }
}
