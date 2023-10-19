import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNotesComponent } from './components/notes/list-notes/list-notes.component';
import { ArchivedNotesComponent } from './components/notes/archived-notes/archived-notes.component';
import { LoginComponent } from './components/user/login.component';

const routes: Routes = [
  {path:'', redirectTo:'/listNotes', pathMatch:'full'},
  {path:'listNotes',component: ListNotesComponent},
  {path:'archivedNotes',component: ArchivedNotesComponent},
  {path:'login',component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
