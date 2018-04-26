import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Activity } from '../models/activity';
import { AuthenticationService } from '../../auth/services/auth.service';

@Injectable()
export class ActivitiesService {
  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  getActivities(plantId: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(
      `${environment.plantsUrl}/${plantId}/activities`,
      this.auth.options
    );
  }

  addActivity(activity: Activity): Observable<any> {
    return this.http.post<any>(
      `${environment.plantsUrl}/${activity.plant_id}/activities`,
      activity,
      this.auth.options
    );
  }

  updateActivity(activity: Activity): Observable<any> {
    return this.http.put<any>(
      `${environment.plantsUrl}/${activity.plant_id}/activities/${
      activity._id
      }`,
      activity,
      this.auth.options
    );
  }

  deleteActivity(activity: Activity): Observable<any> {
    return this.http.delete<any>(
      `${environment.plantsUrl}/${activity.plant_id}/activities/${activity._id}`,
      this.auth.options
    );
  }
}
