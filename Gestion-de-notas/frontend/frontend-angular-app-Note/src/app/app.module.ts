import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArchivedNotesComponent } from './components/notes/archived-notes/archived-notes.component';
import { ListNotesComponent } from './components/notes/list-notes/list-notes.component';
import { NoteService } from './services/note.service';
import { NoteComponent } from './components/notes/note/note.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModalFormComponent } from './components/notes/modal-form/modal-form.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/user/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthToken } from './services/interceptors/auth.interceptor';
import { TokenInterceptor } from './services/interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ArchivedNotesComponent,
    ListNotesComponent,
    NoteComponent,
    ModalFormComponent,
    LoginComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [NoteService,
  {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},
  {provide:HTTP_INTERCEPTORS,useClass:AuthToken,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
