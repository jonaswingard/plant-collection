import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms';
import { Note } from '../models/note';
import { Plant } from '../models/plant';

@Component({
  selector: 'pc-note-edit',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit(form)">
      <label>
        Text
        <textarea placeholder="Text" formControlName="text"></textarea>
      </label>
      <button [disabled]="form.invalid">
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
export class NoteEditComponent implements OnChanges {
  @Input() plant: Plant;
  @Output() onSubmit = new EventEmitter<Note>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      text: ['', Validators.required],
      plant_id: ''
    });
  }

  ngOnChanges(changes) {
    this.form.patchValue({
      plant_id: this.plant._id
    });
  }

  submit({ value, valid }) {
    this.onSubmit.emit(value);
  }
}
