package com.springboot.backend.notas.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.notas.models.Note;


public interface INoteDao extends JpaRepository<Note, Long> {

}
