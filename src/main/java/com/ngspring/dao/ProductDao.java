/**
 * @author Aaron Arce Hernandez (aaronarce02@gmail.com)
 * Created on: 22/04/2017
 */
package com.ngspring.dao;

import org.springframework.data.repository.CrudRepository;

import com.ngspring.model.Product;

public interface ProductDao extends CrudRepository<Product, Long> {
	
	public Product findByName(String name);
	
	public Product findByBarCode(String barCode);
}
