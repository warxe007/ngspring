/**
 * @author: Aaron Arce Hernandez (aaronarce02@gmail.com)
 * Created on: 22/04/2017
 */
package com.ngspring.controller;

import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ngspring.model.Product;
import com.ngspring.service.InventoryService;

@Controller
public class InventoryController {

	@RequestMapping("/get-all-products")
	public @ResponseBody Map<String, Object> getAll() {
		List<Product> products = new ArrayList<Product>();
		Map<String, Object> model = new HashMap<String, Object>();
		
		try {
			products = inventoryService.findAll();
			model.put("products", products);
		} catch (Exception e) {
			return null;
		}
		
		return model;
	}
	
	@RequestMapping(value="/create-product", method = POST)
	@ResponseBody
	public String create(Product product) {
		try {
			inventoryService.saveProduct(product);
		} catch (Exception e) {
			return "Error creating the product: " + e.toString();
		}
		
		return "{\"message\":\"Product successfully created!\"}";
	}
	
	@RequestMapping(value="/update-product", method = PUT)
	@ResponseBody
	public String update(Product product) {
		try {
			inventoryService.updateProduct(product);
		} catch (Exception e) {
			return "Error updating the product: " + e.toString();
		}
		return "{\"message\":\"Product successfully updated!\"}";
	}
	
	@Autowired
	InventoryService inventoryService;
}
