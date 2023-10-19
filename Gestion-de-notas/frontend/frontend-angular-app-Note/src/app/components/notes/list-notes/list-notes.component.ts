import { Component } from '@angular/core';
import { Note } from 'src/app/models/note';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent {

  constructor(private noteService: NoteService,public authService: AuthService){}

  ngOnInit(){

  }
  
}
