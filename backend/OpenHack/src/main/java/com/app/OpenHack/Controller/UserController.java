package com.app.OpenHack.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.OpenHack.Service.UserService;
import com.app.OpenHack.entity.ErrorMessage;
import com.app.OpenHack.entity.User;
import com.google.firebase.auth.ExportedUserRecord;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.ListUsersPage;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;

@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("/user")
	public User testUser(Authentication authentication) {
		User u = (User)authentication.getPrincipal();
		return u;
	}
	
	@PostMapping("/user")
	@ResponseStatus(value = HttpStatus.CREATED)
	public ResponseEntity<?> createUser(@RequestBody User user) throws Exception {
		CreateRequest request = new CreateRequest()
			    .setEmail(user.getEmail())
			    .setEmailVerified(false)
			    .setPassword(user.getPassword())
			    .setDisplayName(user.getScreenName())
			    .setDisabled(false);

			UserRecord userRecord;
			String uuid = null;
			try {
				userRecord = FirebaseAuth.getInstance().createUser(request);
				uuid = userRecord.getUid();
				user.setUuid(userRecord.getUid());
				userService.createUser(user);
				return new ResponseEntity<>(HttpStatus.CREATED);
			} catch (FirebaseAuthException e) {
				e.printStackTrace();
				return new ResponseEntity<>(new ErrorMessage("Email already exists"),HttpStatus.BAD_REQUEST);
			}catch (Exception e) {
				try {
					FirebaseAuth.getInstance().deleteUser(uuid);
				} catch (FirebaseAuthException e1) {
					e1.printStackTrace();
					throw e1;
				}
				/*Optional<Throwable> rootCause = Stream.iterate(e, Throwable::getCause)
                        .filter(element -> element.getCause() == null)
                        .findFirst();
				rootCause.get().printStackTrace();*/
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
	}
	
	@DeleteMapping("/user")
	@ResponseStatus(value = HttpStatus.OK)
	public void deleteUser() {
		try {
			ListUsersPage page = FirebaseAuth.getInstance().listUsers(null);
			for (ExportedUserRecord user : page.iterateAll()) {
				FirebaseAuth.getInstance().deleteUser(user.getUid());
				try {
				userService.deleteUser(user.getUid());}
				catch(Exception e) {}
			}
		} catch (FirebaseAuthException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	
	@PutMapping("/user")
	@ResponseStatus(value = HttpStatus.OK)
	public void updateUser(@RequestBody User user,Authentication authentication) {
		User loggedInUser = (User)authentication.getPrincipal();
		System.out.println(loggedInUser.getUuid());
		userService.updateUser(user, loggedInUser.getUuid());
	}
	
	@GetMapping("/user/hackers")
	public List<User> getAllHackers(){
		return userService.getAllHackers();
	}
	
	@GetMapping("/user/hackers/{id}")
	public List<User> getAllHackers(@PathVariable Long id){
		return userService.getAllValidHackers(id);
	}
	@PutMapping("/user/leaveorganization")
	@ResponseStatus(value = HttpStatus.OK)
	public void updateUserOrganization(Authentication authentication) {
		User loggedInUser = (User)authentication.getPrincipal();
		userService.updateUserOrganization(loggedInUser.getUuid());
	}
}