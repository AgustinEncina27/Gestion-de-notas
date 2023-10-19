import { Component,OnInit } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { ActivatedRoute } from '@angular/router';
import  swal  from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
declare var bootstrap: any;


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html'
})
export class NoteComponent {
  notes: Note[] = [];

  constructor(private noteService: NoteService,
     private route: ActivatedRoute,
     public authService: AuthService){
  }

  ngOnInit(): void{
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    this.loadData();

    this.noteService.getDataUpdatedObservable().subscribe(() => {
      this.loadData();
    }); 
  }

  loadData(){
    let currentRoute = this.getCurrentRoute()
    this.noteService.getNotes().subscribe(
      note => {
        if(currentRoute=='listNotes'){
          this.notes= note.filter(note => note.archived === false)
        }
        if(currentRoute=='archivedNotes'){
          this.notes= note.filter(note => note.archived === true)
        }
      }
    );
  }

  updateListNotes():void{
    console.log("hola")
  }

  getCurrentRoute(): string {
    const routeConfig = this.route.snapshot.routeConfig;
    if (routeConfig) {
      return routeConfig.path || ''; // Utiliza el valor de path si existe, o un valor por defecto si no
    } else {
      return ''; // O algún otro valor por defecto si no hay una ruta activa
    }
  }

  archivedTrue(note:Note):void{
    let noteUpdate: Note = {
      id: note.id,
      title: note.title,
      content: note.content,
      noteCreationDay: note.noteCreationDay,
      lastEdit: new Date(),
      archived: true,
      categories: note.categories
    };
    this.noteService.update(noteUpdate).subscribe(
      response => {
        this.notes=this.notes.filter(not=> not !== note)
        swal('Nota archivada', 'La nota se ha archivado con éxito!','success') 
      }
    ) 
  }

  archivedFalse(note:Note):void{
    let noteUpdate: Note = {
      id: note.id,
      title: note.title,
      content: note.content,
      noteCreationDay: note.noteCreationDay,
      lastEdit: new Date(),
      archived: false,
      categories: note.categories
    };
    this.noteService.update(noteUpdate).subscribe(
      response => {
        this.notes=this.notes.filter(not=> not !== note)
        swal('Nota desarchivada', 'La nota se ha desarchivado con éxito!','success') 
      }
    ) 
  }

  deleteNote(note:Note):void{
    swal({
      title:'¿Está seguro ?',
      text:'No puede revertir este cambio',
      type:'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo',
      cancelButtonText: 'No, Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons:true
    }).then((result)=>{
      if(result.value){
        this.noteService.deleteNote(note.id).subscribe(
          response=>{
            this.notes=this.notes.filter(not=> not !== note)
            swal('Nota eliminada','La nota ha sido eliminada con éxito!','success')
          }
        )        
      }
    })
    
  }
}
