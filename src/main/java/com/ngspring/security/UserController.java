package com.ngspring.security;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
}
