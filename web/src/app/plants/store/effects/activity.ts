import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as activity from '../actions/activity';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivitiesService } from '../../services/activities.service';
import { Activity } from '../../models/activity';

@Injectable()
export class ActivityEffects {
  constructor(
    private actions$: Actions,
    private activitiesService: ActivitiesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType<activity.Load>(activity.LOAD)
    .map(action => action.payload)
    .switchMap(plantId =>
      this.activitiesService
        .getActivities(plantId)
        .map((activities: Activity[]) => new activity.LoadSuccess(activities))
    );

  @Effect()
  add$: Observable<Action> = this.actions$
    .ofType<activity.Add>(activity.ADD)
    .map(action => action.payload)
    .switchMap(item => this.activitiesService.addActivity(item))
    .map(item => ({
      type: 'add',
      item
    }))
    .map(data => new activity.SaveSuccess(data));

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType<activity.Update>(activity.UPDATE)
    .map(action => action.payload)
    .switchMap(item => this.activitiesService.updateActivity(item))
    .map(
      () =>
        new activity.SaveSuccess({
          type: 'update'
        })
    );

  @Effect()
  delete$: Observable<Action> = this.actions$
    .ofType<activity.Delete>(activity.DELETE)
    .map(action => action.payload)
    .switchMap(id => this.activitiesService.deleteActivity(id))
    .map(
      () =>
        new activity.SaveSuccess({
          type: 'delete'
        })
    );
}
