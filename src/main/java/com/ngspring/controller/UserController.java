package com.ngspring.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

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
import com.ngspring.model.User;

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
	@ResponseBody
	public List<User> getAll() {
		List<User> users = new ArrayList<User>(); 
		try {
			users = (ArrayList<User>) userDao.findAll();
		} catch (Exception ex) {
			return null;
		}
		return users;
	}

	/**
	 * GET /create --> Create a new user and save it in the database.
	 */
	@RequestMapping(value="/create", method = POST)
	@ResponseBody
	public String create(User user) {
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
			User user = new User(id);
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
			User user = userDao.findByEmail(email);
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
	@RequestMapping("/update")
	@ResponseBody
	public String updateUser(long id, String email, String firstName, String lastName) {
		try {
			User user = userDao.findOne(id);
			user.setEmail(email);
			user.setFirstName(firstName);
			user.setLastName(lastName);
			userDao.save(user);
		} catch (Exception ex) {
			return "Error updating the user: " + ex.toString();
		}
		return "User succesfully updated!";
	}

	// Private fields

	@Autowired
	private UserDao userDao;
}
