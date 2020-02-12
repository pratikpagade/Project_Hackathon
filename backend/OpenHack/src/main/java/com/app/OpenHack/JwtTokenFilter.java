package com.app.OpenHack;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;
import org.springframework.web.filter.OncePerRequestFilter;

import com.app.OpenHack.entity.User;
import com.app.OpenHack.repository.UserRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;

public class JwtTokenFilter extends OncePerRequestFilter{

	private UserRepository userRepository;
	
	public JwtTokenFilter(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
		
		
		try {
			User user;
			String uri = request.getRequestURI();
			if(request.getMethod().equals("POST") && uri.equals("/user")) {
				user = new User();
			}
			else if(uri.equals("/team/invite/accept") || uri.equals("/organization/join"))
				user = new User();
			else {
				String token = request.getHeader("Authorization").substring(7);
				FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
				String uid = decodedToken.getUid();
				UserRecord userRecord = FirebaseAuth.getInstance().getUser(uid);
				System.out.println(uid);
				System.out.println(userRecord.getDisplayName() + " name");
				System.out.println(userRecord.getEmail() + " email");
				System.out.println(userRecord.isEmailVerified()+ "  isEmailVarified");
				System.out.println(request.getRequestURI() + "  is ");
				
				System.out.println(userRepository);
				user = userRepository.findById(uid).get();
			}
			
			Authentication auth = new UsernamePasswordAuthenticationToken(user, "", user.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(auth);
		}catch(Exception e) {e.printStackTrace();
			SecurityContextHolder.clearContext();
			response.sendError(401, e.getMessage());
			return;
		}
		filterChain.doFilter(request, response);
	}

}
