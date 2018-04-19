import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Plant } from '../models/plant';
import { AuthenticationService } from '../../auth/services/auth.service';

@Injectable()
export class PlantsService {
  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${environment.plantsUrl}`, {
      headers: { Authorization: `Bearer ${this.auth.getToken()}` }

    });
  }

  getPlant(id: string): Observable<Plant> {
    return this.http.get<Plant>(`${environment.plantsUrl}/${id}`);
  }

  addPlant(plant: Plant): Observable<any> {
    return this.http.post<any>(`${environment.plantsUrl}`, plant);
  }

  updatePlant(plant: Plant): Observable<any> {
    return this.http.put<any>(`${environment.plantsUrl}/${plant._id}`, plant);
  }

  deletePlant(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.plantsUrl}/${id}`);
  }

  uploadImage(id, file): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file);

    return this.http.post(
      `${environment.plantsUrl}/${id}/image/upload`,
      formData
    );
  }
}
