import { Component } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-archived-notes',
  templateUrl: './archived-notes.component.html',
  styleUrls: ['./archived-notes.component.css']
})
export class ArchivedNotesComponent {


  constructor(private noteService: NoteService){}

  ngOnInit(){
  }
}
