package com.springboot.backend.notas.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.notas.models.Note;
import com.springboot.backend.notas.service.INoteService;


@CrossOrigin(origins= {"http://localhost:4200", "http://localhost"})
@RestController
@RequestMapping("/api")
public class NotaController {
	
	@Autowired
	private INoteService noteService;

	@GetMapping("/notes")
	public List<Note> index() {
		return noteService.findAllNote();
	}
	
	@Secured({"ROLE_ADMIN","ROLE_USER"})
	@GetMapping("/notes/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		
		Note note = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			note = noteService.findById(id);
		} catch(DataAccessException e) {
			response.put("mensaje", "Error when querying the database");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(note == null) {
			response.put("mensaje", "Note ID: ".concat(id.toString().concat(" does not exist in the database!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		 System.out.println(note);
		return new ResponseEntity<Note>(note, HttpStatus.OK);
	}
	
	@Secured("ROLE_ADMIN")
	@PostMapping("/notes")
	public ResponseEntity<?> create(@Valid @RequestBody Note note, BindingResult result) {
		Note noteNew = null;
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {

			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "Field '" + err.getField() +"' "+ err.getDefaultMessage())
					.collect(Collectors.toList());
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		try {
			noteNew = noteService.save(note);
			
		} catch(DataAccessException e) {
			response.put("mensaje", "Error when performing the insert in the database");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "The note has been created successfully!");
		response.put("note", noteNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
		
	@Secured("ROLE_ADMIN")
	@PutMapping("/notes/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Note note, BindingResult result, @PathVariable Long id) {

		Note currentNote = noteService.findById(id);

		Note noteUpdated = null;

		Map<String, Object> response = new HashMap<>();

		if(result.hasErrors()) {

			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "Field '" + err.getField() +"' "+ err.getDefaultMessage())
					.collect(Collectors.toList());
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if (currentNote == null) {
			response.put("mensaje", "Error: Could not edit, note ID: "
					.concat(id.toString().concat(" does not exist in the database!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		try {

			currentNote.setTitle(note.getTitle());
			currentNote.setContent(note.getContent());
			currentNote.setNoteCreationDay(note.getNoteCreationDay());
			currentNote.setLastEdit(note.getLastEdit());
			currentNote.setArchived(note.getArchived());
			currentNote.setCategories(note.getCategories());
			
			noteUpdated = noteService.save(currentNote);

		} catch (DataAccessException e) {
			response.put("mensaje", "Error updating the note in the database");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "The note has been successfully updated!");
		response.put("nota", noteUpdated);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/notes/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		
		Map<String, Object> response = new HashMap<>();
		
		try {
			noteService.deleteNote(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error deleting the note from the database");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "Note successfully removed!");
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
	
}
