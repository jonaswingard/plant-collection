import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromPlants from '../store/reducers';
import * as collection from '../store/actions/collection';
import { Plant } from '../models/plant';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms';

@Component({
  selector: 'pc-plant-edit',
  template: `
    <img *ngIf="plant && plant.image_url" [src]="'http://localhost:8080/' + plant.image_url">
    <form [formGroup]="form" (ngSubmit)="submit(form)">
      <mat-form-field>
        <input matInput placeholder="Name" formControlName="name">
      </mat-form-field>
      <mat-form-field>
        <textarea matInput placeholder="Water" formControlName="water"></textarea>
      </mat-form-field>
      <mat-form-field>
        <textarea matInput placeholder="Fertilize" formControlName="fertilize"></textarea>
      </mat-form-field>
      <mat-form-field>
        <textarea matInput placeholder="Placement" formControlName="placement"></textarea>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Sort" formControlName="sort">
      </mat-form-field>
      <button mat-raised-button [disabled]="form.invalid">
        Submit
      </button>
      <button type="button" mat-raised-button [disabled]="!plant._id" (click)="delete(plant._id)">
        Delete
      </button>
    </form>

  `,
  styles: [
    `
    mat-form-field {
      width: 100%;
    }
  `
  ]
})
export class PlantEditComponent implements OnChanges {
  @Input() plant: Plant;
  @Output() onSubmit = new EventEmitter<Plant>();
  @Output() onDelete = new EventEmitter<string>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      _id: '',
      name: ['', Validators.required],
      water: '',
      fertilize: '',
      placement: '',
      sort: ''
    });
  }

  submit({ value, valid }) {
    this.onSubmit.emit(value);
  }

  delete(id: string) {
    this.onDelete.emit(id);
  }

  ngOnChanges(changes) {
    this.form.patchValue(this.plant);
  }
}
