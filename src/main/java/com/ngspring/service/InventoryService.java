/**
 * @author: Aaron Arce Hernandez (aaronarce02@gmail.com)
 * Created on: 22/04/2017
 */
package com.ngspring.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ngspring.dao.ProductDao;
import com.ngspring.model.Product;

@Component
public class InventoryService {

	@Autowired
	ProductDao productDao;
	
	Product productToSave;

	public ArrayList<Product> findAll() {
		return (ArrayList<Product>) productDao.findAll();
	}

	public void saveProduct(Product product) {
		Product productToSave = transferToDomain(product);
		
		productDao.save(productToSave);
	}
	
	public void updateProduct(Product product) {
		productToSave = productDao.findOne(product.getId());
		productToSave = transferToDomain(product);
		
		if(productToSave != null) {
			productDao.save(productToSave);
		}
	}

	private Product transferToDomain(Product product) {
		productToSave = productToSave != null ? productToSave : new Product();

		productToSave.setName(product.getName());
		productToSave.setBarCode(product.getBarCode());
		productToSave.setMeasurementUnit(product.getMeasurementUnit());
		productToSave.setEntryCost(product.getEntryCost());
		productToSave.setSaleCost(product.getSaleCost());
		productToSave.setQuantity(product.getQuantity());

		return productToSave;
	}
}
