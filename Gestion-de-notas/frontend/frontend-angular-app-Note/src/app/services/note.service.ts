import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { Observable,Subject,catchError,map,throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



import swal from 'sweetalert2';
import { Category } from '../models/category';
import { AuthService } from './auth.service';

@Injectable()
export class NoteService {
  private urlEndPointNote:string ='http://localhost:8080/api/notes';
  private urlEndPointCategory:string ='http://localhost:8080/api/category';
  private dataUpdated = new Subject<void>();
  

  constructor(private http: HttpClient) { }



  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.urlEndPointNote)
  }

  getNote(id:number): Observable<Note>{
    return this.http.get<Note>(`${this.urlEndPointNote}/${id}`).pipe(
      catchError(e=>{
        if (e.status == 400) {
          let error = e.error.errors.join(" ")
          swal("Error al crear la nota",error,'error');
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
          swal(e.error.mensaje,e.error.error,'error');
        }
        return throwError(() => e);
      })
    )
  }

  createNote(note:Note): Observable<any>{
    return this.http.post<any>(this.urlEndPointNote,note).pipe(
      map((response: any)=>response.Note as Note),
      catchError(e=>{

        if (e.status == 400) {
          let error = e.error.errors.join(" ")
          swal("Error al crear la nota",error,'error');
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
          swal(e.error.mensaje,e.error.error,'error');
        }
        return throwError(() => e);
      })
    )
  }

  update(note:Note): Observable<any>{
    return this.http.put<any>(`${this.urlEndPointNote}/${note.id}`,note).pipe(
      map((response: any)=>response.Note as Note),
      catchError(e=>{

        if (e.status == 400) {
          let error = e.error.errors.join(" ")
          swal("Error al crear la nota",error,'error');
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
          swal(e.error.mensaje,e.error.error,'error');
        }
        return throwError(() => e);
      })
    )
  }

  deleteNote(id:number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPointNote}/${id}`).pipe(
      catchError(e=>{

        if (e.status == 400) {
          let error = e.error.errors.join(" ")
          swal("Error al crear la nota",error,'error');
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
          swal(e.error.mensaje,e.error.error,'error');
        }
        return throwError(() => e);
      })
    )
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.urlEndPointCategory)
  }

  deleteCategory(id:number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPointCategory}/${id}`).pipe(
      catchError(e=>{
        if (e.status == 400) {
          let error = e.error.errors.join(" ")
          swal("Error al crear la nota",error,'error');
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
          swal(e.error.mensaje,e.error.error,'error');
        }
        return throwError(() => e);
      })
    )
  }

  createCategory(category:Category): Observable<any>{
    return this.http.post<any>(this.urlEndPointCategory,category).pipe(
      map((response: any)=>response.category as Category),
      catchError(e=>{
        if (e.status == 400) {
          let error = e.error.errors.join(" ")
          swal("Error al crear la categoria",error,'error');
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
          swal(e.error.mensaje,e.error.error,'error');
        }
        return throwError(() => e);
      })
    )
  }

  getDataUpdatedObservable(): Observable<void> {
    return this.dataUpdated.asObservable();
  }

  triggerDataUpdated() {
    this.dataUpdated.next();
  }
}
