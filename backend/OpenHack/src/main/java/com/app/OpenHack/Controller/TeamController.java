package com.app.OpenHack.Controller;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.OpenHack.GlobalConst;
import com.app.OpenHack.Service.TeamService;
import com.app.OpenHack.entity.Team;
import com.app.OpenHack.entity.User;

@RestController
public class TeamController {

	@Autowired
	TeamService teamService;

	@PostMapping("/hackathon/register")
	@ResponseStatus(HttpStatus.OK)
	public Team addTeam(@RequestBody Map<String, Object> payload, Authentication authentication) {
		User user = (User) authentication.getPrincipal();
		return teamService.addTeam(user, ((Integer) payload.get("hackathonId")).longValue(),
				(String) payload.get("teamName"));

	}

	@PostMapping("/team/invite")
	@ResponseStatus(HttpStatus.OK)
	public void inviteToTeam(@RequestBody Map<String, Object> payload) {
		
		String role = (String) payload.get("role");
		teamService.inviteToTeam(Long.parseLong(payload.get("teamId").toString()), (String) payload.get("uuid"), role);
	}

	@GetMapping("/team/invite/accept")
	@ResponseStatus(HttpStatus.OK)
	public void acceptTeamInvite(@RequestParam String token, HttpServletResponse httpServletResponse) {
		teamService.acceptTeamInvite(token);
		httpServletResponse.setHeader("Location", GlobalConst.UI_URL);
		httpServletResponse.setStatus(302);
	}

	@PutMapping("/team/submit")
	@ResponseStatus(value = HttpStatus.OK)
	public Team submitHackathon(@RequestBody Map<String, Object> payload) {
		return teamService.submitHackathon(((Integer) payload.get("teamId")).longValue(),
				(String) payload.get("submitionUrl"));
	}

	@PutMapping("/team/grade")
	@ResponseStatus(value = HttpStatus.OK)
	public void gradeTeam(@RequestBody Map<String, Object> payload) {
		teamService.gradeTeam(Long.parseLong(payload.get("teamId").toString()),
				Float.parseFloat(payload.get("grades").toString()));
	}
}