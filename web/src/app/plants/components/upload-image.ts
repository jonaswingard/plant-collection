import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Plant } from '../models/plant';
import { PlantsService } from '../services/plants.service';

@Component({
  selector: 'pc-upload-image',
  template: `
    <input type="file"
      (change)="fileChange($event)"
      placeholder="Upload image">
  `
})
export class UploadImageComponent {
  @Input() plant: Plant;
  @Output() onFileChange = new EventEmitter<any>();

  constructor(private plantsService: PlantsService) {}

  fileChange(event) {
    let fileList: FileList = event.target.files;
    fileList.length && this.onFileChange.emit([this.plant, fileList[0]]);
  }
}
