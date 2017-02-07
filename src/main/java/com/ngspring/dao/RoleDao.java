package com.ngspring.dao;

import org.springframework.data.repository.CrudRepository;

import com.ngspring.model.StoreRole;

public interface RoleDao extends CrudRepository<StoreRole, Long> {
	
	public StoreRole findRoleByRole(String role);

}
