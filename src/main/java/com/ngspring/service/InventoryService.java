/**
 * @author: Aaron Arce Hernandez (aaronarce02@gmail.com)
 * Created on: 22/04/2017
 */
package com.ngspring.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ngspring.dao.ProductDao;
import com.ngspring.model.Product;

@Component
public class InventoryService {

	@Autowired
	ProductDao productDao;

	public ArrayList<Product> findAll() {
		return (ArrayList<Product>) productDao.findAll();
	}

	@Transactional
	public void saveProduct(Product product) {
		Product productToSave = transferToDomain(product);
		
		productDao.save(productToSave);
	}
	
	@Transactional
	public void updateProduct(Product product) {
		Product productToUpdate = productDao.findOne(product.getId());
		productToUpdate = transferToDomain(product);
		
		if(productToUpdate != null) {
			productDao.save(productToUpdate);
		}
	}

	private Product transferToDomain(Product product) {
		Product domain =  productDao.findOne(product.getId());
		
		if(domain == null) {
			domain = new Product();
		}

		domain.setName(product.getName());
		domain.setBarCode(product.getBarCode());
		domain.setMeasurementUnit(product.getMeasurementUnit());
		domain.setEntryCost(product.getEntryCost());
		domain.setSaleCost(product.getSaleCost());
		domain.setQuantity(product.getQuantity());
		domain.setDescription(product.getDescription());

		return domain;
	}
}
