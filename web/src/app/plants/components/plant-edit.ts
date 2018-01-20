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
  <pre>
{{ plant | json }}
  </pre>
    <form [formGroup]="form" (ngSubmit)="submit(form)">
      <label>
        Name
        <input placeholder="Name" formControlName="name">
      </label>
      <label>
        Water
        <textarea placeholder="Water" formControlName="water"></textarea>
      </label>
      <label>
        Fertilize
        <textarea placeholder="Fertilize" formControlName="fertilize"></textarea>
      </label>
      <label>
        Placement
        <textarea placeholder="Placement" formControlName="placement"></textarea>
      </label>
      <label>
        Sort
        <input placeholder="Sort" formControlName="sort">
      </label>

      <button [disabled]="form.invalid">
        Submit
      </button>
      <button type="button" [disabled]="!plant._id" (click)="delete(plant._id)">
        Delete
      </button>
    </form>

  `,
  styles: [
    `
    label {
      display: block;
    }
    input {
      width: 250px;
    }
    textarea {
      width: 250px;
      height: 50px;
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
