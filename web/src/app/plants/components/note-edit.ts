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
      <mat-form-field>
        <textarea matInput placeholder="Text" formControlName="text"></textarea>
      </mat-form-field>
      <button mat-raised-button [disabled]="form.invalid">
        Submit
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
export class NoteEditComponent implements OnChanges {
  @Input() plant: Plant;
  @Input() note: Note;
  @Output() onSubmit = new EventEmitter<Note>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      text: ['', Validators.required],
      plant_id: '',
      _id: ''
    });
  }

  ngOnChanges(changes) {
    this.form.patchValue({
      plant_id: this.plant._id,
      _id: this.note._id,
      text: this.note.text
    });
  }

  submit({ value, valid }) {
    this.onSubmit.emit(value);
  }
}
