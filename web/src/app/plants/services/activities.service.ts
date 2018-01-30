import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Activity } from '../models/activity';

@Injectable()
export class ActivitiesService {
  constructor(private http: HttpClient) {}

  getActivities(plantId: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(
      `${environment.plantsUrl}/${plantId}/activities`
    );
  }

  addActivity(activity: Activity): Observable<any> {
    return this.http.post<any>(
      `${environment.plantsUrl}/${activity.plant_id}/activities`,
      activity
    );
  }

  updateActivity(activity: Activity): Observable<any> {
    return this.http.put<any>(
      `${environment.plantsUrl}/${activity.plant_id}/activities/${
        activity._id
      }`,
      activity
    );
  }

  deleteActivity(activity: Activity): Observable<any> {
    return this.http.delete<any>(
      `${environment.plantsUrl}/${activity.plant_id}/activities/${activity._id}`
    );
  }
}
