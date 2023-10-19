package com.springboot.backend.notas.models;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name="notes")
public class Note implements Serializable{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@NotEmpty
	@Size(max=40,message = "el máximo es 40 caracteres")
	@Column(nullable=false)
	private String title;
	
	private String content;
	
	@Temporal(TemporalType.DATE)
	@Column(nullable=false,name="note_Creation_Day")
	private Date noteCreationDay;
	
	@Temporal(TemporalType.DATE)
	@Column(nullable=false,name="last_edit")
	private Date lastEdit;
	
	@Column(nullable=false)
	private Boolean archived;
	
	@ManyToMany
	@JoinTable(
	        name = "note_category",
	        joinColumns = @JoinColumn(name = "note_id"),
	        inverseJoinColumns = @JoinColumn(name = "category_id")
	)
	private List<Category> categories;
	
	private static final long serialVersionUID = 1L;
}
