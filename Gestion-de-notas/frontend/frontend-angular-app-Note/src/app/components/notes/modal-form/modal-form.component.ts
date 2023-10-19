import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html'
})
export class ModalFormComponent {
  note: Note= new Note();
  modalTitle: string="";
  categories: Category[]= [];
  selectedCategoriesCheckbox: Category[] = [];
  newNameCategoryInput: string = '';

  constructor(private noteService: NoteService){}

  ngOnInit(){ 
    this.loadNote()
  }

  loadCategories(): void {
    this.noteService.getCategories().subscribe(
      categories => this.categories = categories
      );
  }

  loadNote():void{
    const NoteModal = document.getElementById('NoteModal')
    if (NoteModal) {
      NoteModal.addEventListener('show.bs.modal', event => {
        this.note= new Note();
        this.selectedCategoriesCheckbox = [];
        this.categories = [];
        const button = (event as any).relatedTarget
        const id = button.getAttribute('data-bs-whatever')
        if (id) {
          this.modalTitle = "Edit Note";
          this.noteService.getNote(id).subscribe(
            note =>{
              this.note = note;
              this.selectedCategoriesCheckbox = note.categories; 
            } 
          );
        } else {
          this.modalTitle = "Create Note";
        } 
        this.loadCategories(); 
      })
    }
  }

  public createNote(): void{
    this.note.noteCreationDay= new Date();
    this.note.lastEdit=new Date();
    this.note.archived=false;
    this.note.categories=this.selectedCategoriesCheckbox;
    this.noteService.createNote(this.note).subscribe(
      note => {
        swal('Nueva nota', 'La nota se ha creado con éxito!','success')
       this.noteService.triggerDataUpdated();
      }
    )
  }

  public updateNote():void{
    this.note.lastEdit= new Date();
    this.note.categories=this.selectedCategoriesCheckbox;
    this.noteService.update(this.note).subscribe(
      note => {
        swal('Nota Editada', 'La nota se ha editado con éxito!','success') 
        this.noteService.triggerDataUpdated();
      }
    )
  }

  //CATEGORIAS
  isCategorySelectedInCheckBox(category: Category): boolean {
    return this.selectedCategoriesCheckbox.findIndex(selectedCategory => selectedCategory.id === category.id) !== -1;
  }
  
  toggleCategorySelection(category: Category) {
    if (this.isCategorySelectedInCheckBox(category)) {
      this.selectedCategoriesCheckbox = this.selectedCategoriesCheckbox.filter(selectedCategory => selectedCategory.id !== category.id); 
    } else {
      this.selectedCategoriesCheckbox.push(category);
    }
  }

  public createCategory():void{
    let category= new Category();
    category.name=this.newNameCategoryInput
    this.noteService.createCategory(category).subscribe(
      category => {
        swal('Nueva categoria', 'La categoria se ha creado con éxito!','success')
        this.newNameCategoryInput=''
        this.categories.push(category);
      }
    )
  }

}

