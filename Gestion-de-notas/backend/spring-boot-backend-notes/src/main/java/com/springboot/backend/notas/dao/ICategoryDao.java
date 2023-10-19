package com.springboot.backend.notas.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.springboot.backend.notas.models.Category;

@Repository
public interface ICategoryDao extends JpaRepository<Category, Long> {

	@Modifying
    @Query(value = "DELETE FROM note_category WHERE category_id = :categoryId", nativeQuery = true)
    void deleteNoteCategoryByCategoryId(@Param("categoryId") Long categoryId);
}
