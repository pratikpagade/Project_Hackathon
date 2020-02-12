package com.app.OpenHack.Controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.OpenHack.GlobalConst;
import com.app.OpenHack.Service.OrganizationService;
import com.app.OpenHack.entity.ErrorMessage;
import com.app.OpenHack.entity.Organization;
import com.app.OpenHack.entity.User;

@RestController
public class OrganizationController {
	
	@Autowired
	OrganizationService organizationService;
	
	@PostMapping("/organization")
	public ResponseEntity<?> createOrganization(@RequestBody Organization org,Authentication authentication) throws Exception {
		try {
			User user = (User)authentication.getPrincipal();
			organizationService.createOrganization(org,user);
            return new ResponseEntity<>(HttpStatus.CREATED);
		}
		catch(Exception e)
		{
			return new ResponseEntity<>(new ErrorMessage("Organization name exists"),HttpStatus.BAD_REQUEST);
			
		}
	}
	
	@GetMapping("/organization")
	public Organization getMyOrganization(Authentication auth) {
		User u = (User)auth.getPrincipal();
		return u.getOrganization();
	}
	
	@GetMapping("/organization/{id}")
	public Organization getOrganization(@PathVariable Long id) {
		return organizationService.getOrganization(id);
	}
	
	@PostMapping("/organization/join/request")
	@ResponseStatus(HttpStatus.OK)
	public void requestToJoin(@RequestBody Map<String, Object> payload,Authentication auth) {
		User u = (User)auth.getPrincipal();
		System.out.println(u.getUuid() + "   some uuid");
		organizationService.requestToJoin(((Integer)payload.get("orgId")).longValue(),u);
		
	}
	
	@GetMapping("/organization/join")
	@ResponseStatus(HttpStatus.OK)
	public void joinOrganization(@RequestParam String token,HttpServletResponse httpServletResponse) {
		organizationService.joinOrganization(token);
		
		httpServletResponse.setHeader("Location", GlobalConst.UI_URL);
	    httpServletResponse.setStatus(302);
	}
	
	@GetMapping("/organization/all")
	@ResponseStatus(HttpStatus.OK)
	public List<Organization> getAllOrganization(){
		return organizationService.getAllOrganization();
	}
}
