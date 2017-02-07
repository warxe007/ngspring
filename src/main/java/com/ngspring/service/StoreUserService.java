package com.ngspring.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.ngspring.dao.RoleDao;
import com.ngspring.dao.UserDao;
import com.ngspring.model.StoreRole;
import com.ngspring.model.StoreUser;

@Component
public class StoreUserService {
	
	@Autowired
	RoleDao roleDao;
	
	@Autowired
	UserDao userDao;
	
	public ArrayList<StoreUser> findAll() {
		return (ArrayList<StoreUser>) userDao.findAll();
	}

	public void saveUser(StoreUser user) {
		StoreUser userToSave = new StoreUser();
		Set<StoreRole> roles = new HashSet<StoreRole>();
		
		userToSave.setFirstName(user.getFirstName());
		userToSave.setLastName(user.getLastName());
		userToSave.setEmail(user.getEmail());
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(user.getPassword());
		userToSave.setPassword(hashedPassword);
		userToSave.setGender(user.getGender() != null ? user.getGender() : null);
		userToSave.setAddress(user.getAddress() != null ? user.getAddress() : null);
		userToSave.setTelephone(user.getTelephone() != null ? user.getTelephone() : null);
		userToSave.setEnabled(user.isEnabled());
		
		StoreRole role = roleDao.findRoleByRole(user.getRole());
		roles.add(role);
		userToSave.setRoles(roles);
		
		StoreUser existingUser = userDao.findByEmail(user.getEmail());
		
		if(existingUser == null) {
			userToSave.setCreateDate(new Date(System.currentTimeMillis()));
		}
		
		userToSave.setUpdateDate(new Date(System.currentTimeMillis()));
		
		userDao.save(userToSave);
		
	}
	
	public void updateUser(StoreUser user) {
		StoreUser userToFind = userDao.findByEmail(user.getEmail());
		if(userToFind != null) {
			userToFind.setFirstName(user.getFirstName());
			userToFind.setLastName(user.getLastName());
			userToFind.setEmail(user.getEmail());
			
			/*BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			String hashedPassword = passwordEncoder.encode(user.getPassword());
			userToFind.setPassword(hashedPassword);*/
			
			userToFind.setGender(user.getGender() != null ? user.getGender() : null);
			userToFind.setAddress(user.getAddress() != null ? user.getAddress() : null);
			userToFind.setTelephone(user.getTelephone() != null ? user.getTelephone() : null);
			userToFind.setEnabled(user.isEnabled());
			
			userToFind.setUpdateDate(new Date(System.currentTimeMillis()));
			
			userDao.save(userToFind);
		}
	}
}
