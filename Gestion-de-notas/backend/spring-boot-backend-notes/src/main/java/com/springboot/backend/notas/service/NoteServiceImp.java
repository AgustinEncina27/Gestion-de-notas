package com.springboot.backend.notas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.notas.dao.ICategoryDao;
import com.springboot.backend.notas.dao.INoteDao;
import com.springboot.backend.notas.models.Category;
import com.springboot.backend.notas.models.Note;



@Service
public class NoteServiceImp implements INoteService {
	
	@Autowired
	private INoteDao notaDao;
	
	@Autowired
	private ICategoryDao categoryDao;

	@Override
	@Transactional(readOnly = true)
	public List<Note> findAllNote() {
		return notaDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Note findById(Long id) {
		return notaDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Note save(Note note) {
		return notaDao.save(note);
	}

	@Override
	@Transactional
	public void deleteNote(Long id) {
		Note note = notaDao.findById(id).get();
		notaDao.delete(note);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Category> findAllCategory() {
		return categoryDao.findAll();
	}
	
	@Override
	@Transactional
	public Category save(Category category) {
		return categoryDao.save(category);
	}
	
	@Override
	@Transactional
	public void deleteCategory(Long id) {
		categoryDao.deleteNoteCategoryByCategoryId(id);
		Category category = categoryDao.findById(id).get();
		categoryDao.delete(category);	
	}

	

}
