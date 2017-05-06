/**
 * @author: Aaron Arce Hernandez (aaronarce02@gmail.com)
 * Created on: 06/05/2017
 */
package com.ngspring.dao;

import org.springframework.data.repository.CrudRepository;

import com.ngspring.model.Category;

public interface CategoryDao extends CrudRepository<Category, Long> {

	public Category findByName(String name);
}
