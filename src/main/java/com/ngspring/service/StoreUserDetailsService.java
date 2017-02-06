package com.ngspring.service;

import java.util.HashSet;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.ngspring.NgspringstoreApplication;
import com.ngspring.dao.UserDao;
import com.ngspring.model.StoreRole;
import com.ngspring.model.StoreUser;

@Component
public class StoreUserDetailsService implements UserDetailsService {
	
	final static Logger logger = Logger.getLogger(NgspringstoreApplication.class);
	
	private UserDao userDao;
	
	public StoreUserDetailsService(UserDao userDao){
        this.userDao = userDao;
    }

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
            StoreUser user = userDao.findByEmail(username);
            if (user == null) {
            	logger.info("user not found with the provided username");
            	return null;
            }
            logger.info(" user from username " + user.toString());
            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthorities(user));
        }
        catch (Exception e){
            throw new UsernameNotFoundException("User not found");
        }
	}
	
	private Set<GrantedAuthority> getAuthorities(StoreUser user){
        Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();
        for(StoreRole role : user.getRoles()) {
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(role.getRole());
            authorities.add(grantedAuthority);
        }
        logger.debug("user authorities are " + authorities.toString());
        return authorities;
    }
}
