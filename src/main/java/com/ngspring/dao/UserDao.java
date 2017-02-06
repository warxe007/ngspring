package com.ngspring.dao;

import org.springframework.data.repository.CrudRepository;

import com.ngspring.model.StoreUser;

public interface UserDao extends CrudRepository<StoreUser, Long> {
	/**
	   * This method will find an User instance in the database by its email.
	   * Note that this method is not implemented and its working code will be
	   * automagically generated from its signature by Spring Data JPA.
	   */
	  public StoreUser findByEmail(String email);

}
