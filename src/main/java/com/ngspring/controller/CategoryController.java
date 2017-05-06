/**
 * @author: Aaron Arce Hernandez (aaronarce02@gmail.com)
 * Created on: 06/05/2017
 */
package com.ngspring.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ngspring.model.Category;
import com.ngspring.service.CategoryService;

@Controller
public class CategoryController {

	@RequestMapping("/get-all-categories")
	public @ResponseBody Map<String, Object> getAll() {
		Map<String, Object> model = new HashMap<String, Object>();
		List<Category> categories = new ArrayList<Category>();
		
		try {
			categories = categoryService.findAll();
			model.put("categories", categories);
		} catch (Exception e) {
			return null;
		}
		
		return model;
	}
	
	@Autowired
	CategoryService categoryService;
}
