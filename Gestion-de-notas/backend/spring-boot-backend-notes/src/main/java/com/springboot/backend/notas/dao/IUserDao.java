package com.springboot.backend.notas.dao;

import org.springframework.data.repository.CrudRepository;

import com.springboot.backend.notas.models.User;

public interface IUserDao extends CrudRepository<User, Long>  {

	public User findByUsername(String username);
	
}
