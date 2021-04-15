package com.prilax.lm.security.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prilax.lm.auth.dto.ChangePassword;
import com.prilax.lm.auth.dto.Login;
import com.prilax.lm.auth.dto.LoginOtpVerificationRequest;
import com.prilax.lm.auth.dto.LoginResponse;
import com.prilax.lm.dto.ActionResponse;
import com.prilax.lm.security.dto.RolesResponse;
import com.prilax.lm.security.service.ScSecurityService;

@RestController
@RequestMapping("")
public class ScSecurityController {

	@Autowired
	private ScSecurityService securityService;

	@PostMapping(value = "/login")
	public ResponseEntity<LoginResponse> login(@RequestBody Login login, HttpServletResponse response)
			throws Exception {

		LoginResponse resp = securityService.login(login);
		HttpCookie cookie = ResponseCookie.from("token", resp.getToken()).path("/").build();
		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(resp);
	}

	@PostMapping(value = "/login/otp-verification")
	public ResponseEntity<ActionResponse> otpVerification(@RequestBody LoginOtpVerificationRequest request) {

		ActionResponse response = securityService.verify(request);
		HttpCookie cookie = ResponseCookie.from("token", response.getApiMessage().getDetail()).path("/").build();

		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(response);
	}

	@GetMapping(value = "/{id}/logout")
	public ActionResponse logout(@PathVariable("id") Long id) {
		return securityService.logout(id);
	}

	@PostMapping(value = "/change-password")
	public ActionResponse changePassword(@RequestBody ChangePassword changePassword) {
		return securityService.changePassword(changePassword);
	}

	@GetMapping(value = "/{userId}/roles")
	public RolesResponse roles(@PathVariable("userId") Long userId) {
		return securityService.roles(userId);
	}
}
