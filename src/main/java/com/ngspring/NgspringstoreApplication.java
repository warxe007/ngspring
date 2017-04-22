package com.ngspring;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ngspring.dao.UserDao;
import com.ngspring.service.StoreUserDetailsService;

@SpringBootApplication
@RestController
public class NgspringstoreApplication {

	final static Logger logger = Logger.getLogger(NgspringstoreApplication.class);

	@RequestMapping("/resource")
	public Map<String, Object> home() {
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("id", UUID.randomUUID().toString());
		model.put("content", "Hello World!");
		return model;
	}

	@RequestMapping("/login")
	public Principal login(Principal user) {
		logger.info("User " + user.getName() + " has logged in to the application.");
		return user;
	}

	@Configuration
	@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
	protected static class SecurityConfiguration extends WebSecurityConfigurerAdapter {

		@Autowired
		private UserDao userDao;

		@Override
		protected void configure(AuthenticationManagerBuilder auth) throws Exception {
			auth.userDetailsService(userDetailsServiceBean()).passwordEncoder(getPasswordEncoder());
		}

		@Bean(name = "passwordEncoder")
		public PasswordEncoder getPasswordEncoder() {
			return new BCryptPasswordEncoder();
		}

		@Override
		public UserDetailsService userDetailsServiceBean() throws Exception {
			return new StoreUserDetailsService(userDao);
		}

		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.httpBasic().and().authorizeRequests()
					.antMatchers("/index.html", "/home.html", "/login.html", "/user", "/", "/fonts/**").permitAll().anyRequest()
					.authenticated().and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(NgspringstoreApplication.class, args);
	}
}
