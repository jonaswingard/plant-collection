import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class PlantsService {
  constructor(private http: HttpClient) {}

  getPlants(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.plantsUrl}`);
  }
}
