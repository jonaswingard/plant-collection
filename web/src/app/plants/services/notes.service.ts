import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Note } from '../models/note';

@Injectable()
export class NotesService {
  constructor(private http: HttpClient) {}

  getNotes(plantId: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.plantsUrl}/${plantId}/notes`);
  }

  addNote(note: Note): Observable<any> {
    return this.http.post<any>(
      `${environment.plantsUrl}/${note.plant_id}/notes`,
      note
    );
  }

  updateNote(note: Note): Observable<any> {
    return this.http.put<any>(
      `${environment.plantsUrl}/${note.plant_id}/notes/${note._id}`,
      note
    );
  }

  deleteNote(note: Note): Observable<any> {
    return this.http.delete<any>(
      `${environment.plantsUrl}/${note.plant_id}/notes/${note._id}`
    );
  }
}
