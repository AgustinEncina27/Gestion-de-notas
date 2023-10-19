package com.springboot.backend.notas.service;

import java.util.List;

import com.springboot.backend.notas.models.Category;
import com.springboot.backend.notas.models.Note;



public interface INoteService {
	
	public List<Note> findAllNote();
	
	public Note findById(Long id);
	
	public Note save(Note note);
	
	public void deleteNote(Long id);
	
	public List<Category> findAllCategory();
	
	public Category save(Category category);
	
	public void deleteCategory(Long id);
}
