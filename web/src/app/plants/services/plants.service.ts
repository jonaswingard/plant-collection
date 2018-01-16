import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Plant } from '../models/plant';

@Injectable()
export class PlantsService {
  constructor(private http: HttpClient) {}

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${environment.plantsUrl}`);
  }

  getPlant(id: string): Observable<Plant> {
    return this.http.get<Plant>(`${environment.plantsUrl}/${id}`);
  }
}
