import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms';
import { Activity } from '../models/activity';
import { Plant } from '../models/plant';

@Component({
  selector: 'pc-activity-edit',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit(form)">
      <mat-form-field>
        <textarea matInput placeholder="Date" formControlName="date"></textarea>
      </mat-form-field>
      <mat-form-field>
        <textarea matInput placeholder="Type" formControlName="type"></textarea>
      </mat-form-field>
      <button mat-raised-button [disabled]="form.invalid">
        Submit
      </button>
    </form>
  `
})
export class ActivityEditComponent {
  @Input() activity: Activity;
  @Input() plant: Plant;
  @Output() onSubmit = new EventEmitter<Activity>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      date: ['', Validators.required],
      plant_id: '',
      type: '',
      _id: ''
    });
  }

  ngOnChanges(changes) {
    this.form.patchValue({
      plant_id: this.plant._id,
      _id: this.activity._id,
      date: this.activity.date,
      type: this.activity.type
    });
  }

  submit({ value, valid }) {
    this.onSubmit.emit(value);
  }
}
