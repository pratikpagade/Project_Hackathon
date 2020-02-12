package com.app.OpenHack;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.app.OpenHack.repository.UserRepository;

public class JwtTokenFilterConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

	private UserRepository userRepository;
	
	public JwtTokenFilterConfigurer(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	  public void configure(HttpSecurity http) throws Exception {
	    JwtTokenFilter customFilter = new JwtTokenFilter(userRepository);
	    http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
	  }
}
