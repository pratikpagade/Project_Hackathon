package com.app.OpenHack.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.OpenHack.Service.HackathonService;
import com.app.OpenHack.entity.EarningResult;
import com.app.OpenHack.entity.ErrorMessage;
import com.app.OpenHack.entity.Expense;
import com.app.OpenHack.entity.Hackathon;
import com.app.OpenHack.entity.HackathonResult;
import com.app.OpenHack.entity.User;

@RestController
public class HackathonController {
	
	@Autowired
	HackathonService hackathonService;
	
	@GetMapping("/hackathon/{id}")
	public ResponseEntity<?> getHackathon(@PathVariable Long id) {
		Hackathon hack = hackathonService.getHackathon(id);
		if(hack==null)
			return new ResponseEntity<>(new ErrorMessage("Hackathon not found"),HttpStatus.NOT_FOUND);
		return new ResponseEntity<Hackathon>(hack,HttpStatus.OK);
	}
	
	
	@PostMapping("/hackathon")
	@ResponseStatus(value = HttpStatus.CREATED)
	public ResponseEntity<?> createHackathon(@RequestBody Hackathon hackathon,Authentication authentication) {
		try {
			User user = (User)authentication.getPrincipal();
			hackathonService.createHackathon(hackathon,user);
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
		catch(Exception e)
		{
			return new ResponseEntity<>(new ErrorMessage("Hackathon name exists"),HttpStatus.BAD_REQUEST);
			
		}
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@PutMapping("/hackathon/start/{id}")
	@ResponseStatus(value = HttpStatus.OK)
	public Hackathon startHackathon(@PathVariable Long id) {
		return hackathonService.startHackathon(id);
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@PutMapping("/hackathon/end/{id}")
	@ResponseStatus(value = HttpStatus.OK)
	public Hackathon endHackathon(@PathVariable Long id) {
		return hackathonService.endHackathon(id);
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@PutMapping("/hackathon/startend/{id}")
	@ResponseStatus(value = HttpStatus.OK)
	public Hackathon startendHackathon(@PathVariable Long id) {
		return hackathonService.startendHackathon(id);
	}
	
	@GetMapping("/hackathon/all")
	public List<Hackathon> getAllHackathons(Authentication authentication){
		User loggedInUser = (User)authentication.getPrincipal();
		return hackathonService.getAllHackathons(loggedInUser);
	}
	
	@GetMapping("/hackathon")
	public List<Hackathon> getMyHackathons(Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		return hackathonService.getMyHackathons(user);
	}
	
	@GetMapping("/hackathon/pending")
	public List<Hackathon> getPendingHackathons(Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		return hackathonService.getPendingHackathons(user);
	}
	
	@GetMapping("/hackathon/created")
	public List<Hackathon> getCreatedHackathons(Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		return hackathonService.getCreatedHackathons(user);
	}
	
	@GetMapping("/hackathon/judging")
	public List<Hackathon> getjudgeHackathons(Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		return hackathonService.getjudgeHackathons(user);
	}
	
	@GetMapping("/hackathon/result")
	public List<HackathonResult> getAllResults(){
		return hackathonService.getAllResults();
	}
	
	@GetMapping("/hackathon/earning")
	public List<EarningResult> getAllEarning(){
		return hackathonService.getAllEarning();
	}
	
	@GetMapping("/hackathon/paymentresult")
	public List<HackathonResult> getAllPaymentResult(){
		return hackathonService.getAllPaymentResult();
	}
	
	@PutMapping("/hackathon/finalize/{id}")
	@ResponseStatus(value = HttpStatus.OK)
	public ResponseEntity<?> finalizeHackathon(@PathVariable Long id) {
		try {
		hackathonService.finalize(id);
		return new ResponseEntity<>(HttpStatus.OK);
		}
		catch(Exception e)
		{
			return new ResponseEntity<>(new ErrorMessage("Hackathon can not be finalized yet"),HttpStatus.BAD_REQUEST);
			
		}
	}
	
	@PutMapping("/hackathon/addexpense/{id}")
	@ResponseStatus(value = HttpStatus.OK)
	public ResponseEntity<?> addExpenseHackathon(@PathVariable Long id,@RequestBody Expense exp) {
		try {
			hackathonService.addExpenseHackathon(id,exp);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch(Exception e)
		{
			return new ResponseEntity<>(new ErrorMessage("Expense can not be added"),HttpStatus.BAD_REQUEST);
			
		}
	}
}
