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
    <form [formGroup]="form" (ngSubmit)="onSubmit(form)">
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

      <button type="submit" [disabled]="form.invalid">
        Submit
      </button>
    </form>

  `,
  styles: [
    `
    label {
      display: block;
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
  @Output() onUpdate = new EventEmitter<Plant>();
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

  onSubmit({ value, valid }) {
    this.onUpdate.emit(value);
  }

  ngOnChanges(changes) {
    this.form.patchValue(this.plant);
  }
}
