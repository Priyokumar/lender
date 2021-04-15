package com.prilax.lm.security.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prilax.lm.auth.dto.ChangePassword;
import com.prilax.lm.auth.dto.Login;
import com.prilax.lm.auth.dto.LoginOtpVerificationRequest;
import com.prilax.lm.auth.dto.LoginResponse;
import com.prilax.lm.config.JwtTokenUtil;
import com.prilax.lm.dto.ActionResponse;
import com.prilax.lm.dto.ApiMessage;
import com.prilax.lm.dto.ApiUtil;
import com.prilax.lm.dto.error.InternalServerException;
import com.prilax.lm.dto.error.NotFoundException;
import com.prilax.lm.dto.error.PreConditionFailedException;
import com.prilax.lm.dto.error.UnAuthorizedException;
import com.prilax.lm.security.dto.Menu;
import com.prilax.lm.security.dto.Role;
import com.prilax.lm.security.dto.RolesResponse;
import com.prilax.lm.security.dto.SubMenu;
import com.prilax.lm.security.dto.UserResponse;
import com.prilax.lm.security.entity.SCUserRole;
import com.prilax.lm.security.entity.ScLoginOTP;
import com.prilax.lm.security.entity.ScMenu;
import com.prilax.lm.security.entity.ScRole;
import com.prilax.lm.security.entity.ScSubMenu;
import com.prilax.lm.security.entity.ScUser;
import com.prilax.lm.security.entity.ScUserAudit;
import com.prilax.lm.service.common.CommonService;
import com.prilax.lm.util.ScDateUtil;
import com.prilax.lm.util.ScUtil;
import com.prilax.lm.vo.ActionType;
import com.prilax.lm.vo.ApiMessageType;
import com.prilax.lm.vo.FieldType;
import com.prilax.lm.vo.Filter;
import com.prilax.lm.vo.LoginStatus;
import com.prilax.lm.vo.OTPStatus;
import com.prilax.lm.vo.Operator;

@Service
public class ScSecurityService {

	@Autowired
	private CommonService commonService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private ScUserService userService;

	@Autowired
	private UserDetailsService userDetailService;

	/*
	 * @Autowired private ScDataGenSmsService dataGenSmsService;
	 */

	public LoginResponse login(Login login) throws Exception {

		LoginResponse res = new LoginResponse();

		authenticate(login.getEmail(), login.getPassword());

		final UserDetails userDetails = userDetailService.loadUserByUsername(login.getEmail());

		String userDataStr = "";
		UserResponse userResponse = userService.findUserResponse(userDetails.getUsername());

		try {
			ObjectMapper om = new ObjectMapper();
			userDataStr = om.writeValueAsString(userResponse);
			final String token = jwtTokenUtil.generateToken(userDataStr);
			res.setToken(token);
		} catch (Exception e) {

		}

		res.setStatus(LoginStatus.LOGIN_SUCCESS);
		res.setApiMessage(ApiUtil.okMessage("Successfully logged in."));
		/*
		 * ScUser user = userService.findUserByName(userDetails.getUsername());
		 * 
		 * List<Filter> filters = Arrays.asList( new Filter("userId", Operator.EQUAL,
		 * FieldType.STRING, user.getId()), new Filter("status", Operator.EQUAL,
		 * FieldType.STRING, OTPStatus.ACTIVE) );
		 * 
		 * ScLoginOTP oldLoginOTP = commonService.findOne(filters, ScLoginOTP.class);
		 * 
		 * if(oldLoginOTP != null) { commonService.delete(oldLoginOTP); }
		 * 
		 * 
		 * ScLoginOTP loginOTP = new ScLoginOTP();
		 * loginOTP.setOtp(ScOTPUtils.generateOTP());
		 * loginOTP.setTimeStamp(ScDateUtil.now()); loginOTP.setUserId(user.getId());
		 * loginOTP.setStatus(OTPStatus.ACTIVE); loginOTP =
		 * commonService.save(loginOTP);
		 * 
		 * String message = "Your one time password is "+loginOTP.getOtp()
		 * +" and it will expire in 5 minutes.";
		 * 
		 * ScDatagenResponse smsResponse = dataGenSmsService.sendSms(user.getMobile(),
		 * message);
		 * 
		 * loginOTP.setSmsId(smsResponse.getCampg_id());
		 * loginOTP.setSmsStatus(smsResponse.getStatus());
		 * 
		 * if(loginOTP.getSmsStatus().equals(DataGenSMSStatus.FAILED_TO_SEND)) {
		 * System.out.println("Failed to send sms."); } else
		 * if(loginOTP.getSmsStatus().equals(DataGenSMSStatus.FAILURE)) {
		 * System.out.println("Sent sms but response got as failure"); }
		 * 
		 * loginOTP = commonService.save(loginOTP);
		 */

		return res;
	}

	private void authenticate(String username, String password) throws Exception {
		Objects.requireNonNull(username);
		Objects.requireNonNull(password);

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}

	public ActionResponse logout(Long id) {

		ActionResponse res = new ActionResponse();

		ScUser user = commonService.findById(id, ScUser.class);
		if (!ScUtil.isAllPresent(user))
			throw new NotFoundException(ApiMessageType.USER_NOT_FOUND);

		addUserAudit(ActionType.USER_LOGOUT, "User logout", user);
		res.setApiMessage(ApiUtil.okMessage("Successfully logout"));
		res.setActionMessage("Successfully logout");

		return res;
	}

	public ActionResponse changePassword(ChangePassword changePassword) {

		ActionResponse res = new ActionResponse();

		String newPassword = changePassword.getNewPassword();
		String confirmPassword = changePassword.getConfirmPassword();
		String username = changePassword.getUserName();

		if (!ScUtil.isAllPresent(newPassword, confirmPassword, username))
			throw new InternalServerException(ApiMessageType.INSUFFICIENT_DATA);

		if (!newPassword.equals(confirmPassword))
			throw new InternalServerException(ApiMessageType.PASSWORD_MISMATCH);

		ScUser user = findUserByUserName(username);
		if (!ScUtil.isAllPresent(user))
			throw new NotFoundException(ApiMessageType.USER_NOT_FOUND);

		user.setPassword(newPassword);
		commonService.save(user);

		addUserAudit(ActionType.CHANGE_PASSWORD, "Change password", user);
		res.setApiMessage(ApiUtil.okMessage("Password has been changed successfully"));
		res.setActionMessage("Password has been changed successfully");
		return res;
	}

	public ScUser findUserByUserName(String email) {

		List<Filter> filters = Arrays.asList(new Filter("email", Operator.EQUAL, FieldType.STRING, email));
		ScUser user = commonService.findOne(filters, ScUser.class);
		return user;

	}

	public void addUserAudit(String actionType, String action, ScUser user) {

		ScUserAudit userAudit = new ScUserAudit();

		userAudit.setAction(action);
		userAudit.setActionType(actionType);
		userAudit.setActionDate(new Date());
		userAudit.setUser(user);

		commonService.save(userAudit);

	}

	public RolesResponse roles(Long userId) {

		RolesResponse res = new RolesResponse();

		ScUser user = commonService.findById(userId, ScUser.class);

		if (!ScUtil.isAllPresent(user))
			throw new NotFoundException("No users can be found !");

		List<SCUserRole> userRoles = user.getUserRoles();

		if (!ScUtil.isAllPresent(userRoles)) {
			res.setApiMessage(
					new ApiMessage(true, HttpStatus.NOT_FOUND.value(), "No role found", HttpStatus.NOT_FOUND.name()));
			res.setData(new ArrayList<>());
		}

		List<Role> dtoRoles = new ArrayList<>();
		userRoles.forEach(userRole -> {

			Role dtoRole = new Role();
			ScRole role = userRole.getRole();

			if (ScUtil.isAllPresent(role)) {
				dtoRole.setId(role.getId());
				dtoRole.setName(role.getName());

				/*
				 * List<ScMenu> menus = role.getMenus(); if (ScUtil.isAllPresent(menus)) {
				 * 
				 * List<Menu> dtoMenus = new ArrayList<>(); menus.forEach(menu -> {
				 * 
				 * Menu dtoMenu = new Menu();
				 * 
				 * dtoMenu.setHasSubmenu(menu.getHasSubmenu()); dtoMenu.setIcon(menu.getIcon());
				 * dtoMenu.setId(menu.getId()); dtoMenu.setOrder(menu.getOrder());
				 * dtoMenu.setPath(menu.getPath()); dtoMenu.setTitle(menu.getTitle());
				 * dtoMenus.add(dtoMenu);
				 * 
				 * List<ScSubMenu> subMenus = menu.getSubMenus(); if
				 * (ScUtil.isAllPresent(subMenus)) {
				 * 
				 * List<SubMenu> dtoSubMenus = new ArrayList<>();
				 * 
				 * subMenus.forEach(subMenu -> {
				 * 
				 * SubMenu dtoSubMenu = new SubMenu();
				 * 
				 * dtoSubMenu.setIcon(subMenu.getIcon()); dtoSubMenu.setId(subMenu.getId());
				 * dtoSubMenu.setOrder(subMenu.getOrder());
				 * dtoSubMenu.setPath(subMenu.getPath());
				 * dtoSubMenu.setTitle(subMenu.getTitle());
				 * 
				 * dtoSubMenus.add(dtoSubMenu); });
				 * 
				 * dtoMenu.setSubmenu(dtoSubMenus); } }); dtoRole.setMenus(dtoMenus); }
				 */
			}
			dtoRoles.add(dtoRole);
		});
		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoRoles);
		return res;
	}

	public ActionResponse verify(LoginOtpVerificationRequest request) {

		ActionResponse response = new ActionResponse();

		String userName = request.getUserName();
		Integer otp = request.getOtp();

		ScUser user = userService.findUserByName(userName);

		if (user == null) {
			throw new NotFoundException("User not found.");
		}

		List<Filter> filters = Arrays.asList(new Filter("userId", Operator.EQUAL, FieldType.STRING, user.getId()),
				new Filter("status", Operator.EQUAL, FieldType.STRING, OTPStatus.ACTIVE));

		ScLoginOTP loginOTP = commonService.findOne(filters, ScLoginOTP.class);

		if (loginOTP == null) {
			throw new UnAuthorizedException("Otp not found.");
		}

		if (loginOTP.getOtp().equals(otp)) {

			Date otpDate = loginOTP.getTimeStamp();
			Date currentDate = ScDateUtil.now();

			long diff = currentDate.getTime() - otpDate.getTime();
			long diffMinutes = diff / (60 * 1000) % 60;

			if (diffMinutes > 5) {
				loginOTP.setStatus(OTPStatus.EXPIRED);
				commonService.save(loginOTP);
				throw new PreConditionFailedException("OTP expired.");
			}

			String userDataStr = "";
			UserResponse userResponse = userService.findUserResponse(userName);

			try {
				ObjectMapper om = new ObjectMapper();
				userDataStr = om.writeValueAsString(userResponse);
				final String token = jwtTokenUtil.generateToken(userDataStr);
				response.getApiMessage().setDetail(token);
			} catch (Exception e) {

			}
			loginOTP.setStatus(OTPStatus.EXPIRED);
			commonService.save(loginOTP);
			response.getApiMessage().setError(false);
			response.setActionMessage(LoginStatus.OTP_VERIFIED);

		} else {
			throw new InternalServerException("Invalid OTP");
		}

		return response;
	}

}
