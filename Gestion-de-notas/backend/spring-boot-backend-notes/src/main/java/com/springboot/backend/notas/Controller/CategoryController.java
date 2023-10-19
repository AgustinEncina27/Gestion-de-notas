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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.notas.models.Category;
import com.springboot.backend.notas.service.INoteService;



@CrossOrigin(origins= {"http://localhost:4200", "http://localhost"})
@RestController
@RequestMapping("/api")
public class CategoryController {

	@Autowired
	private INoteService noteService;
	
	@GetMapping("/category")
	public List<Category> index() {
		return noteService.findAllCategory();
	}
	
	@Secured("ROLE_ADMIN")
	@PostMapping("/category")
	public ResponseEntity<?> createCategory(@Valid @RequestBody Category category, BindingResult result) {
		
		Category categoryNew = null;
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
			categoryNew = noteService.save(category);
		} catch(DataAccessException e) {
			response.put("mensaje", "Error when performing the insert in the database");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "La categoria ha sido creada con éxito!");
		response.put("category", categoryNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/category/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		
		Map<String, Object> response = new HashMap<>();
		
		try {
			noteService.deleteCategory(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error deleting category from database");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "Note successfully removed!");
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
}
