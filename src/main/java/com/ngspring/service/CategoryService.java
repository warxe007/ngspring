/**
 * @author: Aaron Arce Hernandez (aaronarce02@gmail.com)
 * Created on: 06/05/2017
 */
package com.ngspring.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ngspring.dao.CategoryDao;
import com.ngspring.model.Category;

@Component
public class CategoryService {
	
	@Autowired
	CategoryDao categoryDao;
	
	Category categoryToSave;
	
	public ArrayList<Category> findAll() {
		return (ArrayList<Category>) categoryDao.findAll();
	}

}
