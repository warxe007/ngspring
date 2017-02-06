package com.ngspring.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ngspring.dao.UserDao;
import com.ngspring.model.StoreUser;

@Controller
public class UserController {

	@RequestMapping(value = "/user", method = GET, produces = APPLICATION_JSON_VALUE)
	public @ResponseBody Map<String, Object> getPrincipal() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName(); // get logged in username

		Map<String, Object> model = new HashMap<String, Object>();
		model.put("username", name);
		model.put("authorities", auth.getAuthorities());
		return model;
	}
	
	/**
	 * GET /get-by-email --> Return the id for the user having the passed email.
	 */
	@RequestMapping("/get-all")
	public @ResponseBody Map<String, Object> getAll() {
		List<StoreUser> users = new ArrayList<StoreUser>(); 
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			users = (ArrayList<StoreUser>) userDao.findAll();
			model.put("users", users);
		} catch (Exception ex) {
			return null;
		}
		return model;
	}

	/**
	 * GET /create --> Create a new user and save it in the database.
	 */
	@RequestMapping(value="/create", method = POST)
	@ResponseBody
	public String create(StoreUser user) {
		try {
			user.setCreateDate(new Date(System.currentTimeMillis()));
			user.setUpdateDate(new Date(System.currentTimeMillis()));
			userDao.save(user);
		} catch (Exception ex) {
			return "Error creating the user: " + ex.toString();
		}
		return "{\"message\":\"User successfully created!\"}";
	}

	/**
	 * GET /delete --> Delete the user having the passed id.
	 */
	@RequestMapping("/delete")
	@ResponseBody
	public String delete(long id) {
		try {
			StoreUser user = new StoreUser(id);
			userDao.delete(user);
		} catch (Exception ex) {
			return "Error deleting the user:" + ex.toString();
		}
		return "User succesfully deleted!";
	}

	/**
	 * GET /get-by-email --> Return the id for the user having the passed email.
	 */
	@RequestMapping("/get-by-email")
	@ResponseBody
	public String getByEmail(String email) {
		String userId = "";
		try {
			StoreUser user = userDao.findByEmail(email);
			userId = String.valueOf(user.getId());
		} catch (Exception ex) {
			return "User not found";
		}
		return "The user id is: " + userId;
	}

	/**
	 * GET /update --> Update the email and the name for the user in the
	 * database having the passed id.
	 */
	@RequestMapping(value = "/update", method = PUT)
	@ResponseBody
	public String updateUser(StoreUser user) {
		try {
			StoreUser userToFind = userDao.findByEmail(user.getEmail());
			if(userToFind != null) {
				userToFind.setUpdateDate(new Date(System.currentTimeMillis()));
				userToFind.setFirstName(user.getFirstName());
				userToFind.setLastName(user.getLastName());
				userDao.save(userToFind);
			}
		} catch (Exception ex) {
			return "Error updating the user: " + ex.toString();
		}
		return "{\"message\":\"User successfully updated!\"}";
	}

	// Private fields

	@Autowired
	private UserDao userDao;
}
