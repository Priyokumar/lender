package com.prilax.lm.security.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.prilax.lm.dto.ActionResponse;
import com.prilax.lm.dto.ApiUtil;
import com.prilax.lm.dto.error.NotFoundException;
import com.prilax.lm.security.dto.Role;
import com.prilax.lm.security.dto.User;
import com.prilax.lm.security.dto.UserResponse;
import com.prilax.lm.security.dto.UsersResponse;
import com.prilax.lm.security.entity.SCUserRole;
import com.prilax.lm.security.entity.ScRole;
import com.prilax.lm.security.entity.ScUser;
import com.prilax.lm.service.common.CommonService;
import com.prilax.lm.util.LmUtil;
import com.prilax.lm.vo.FieldType;
import com.prilax.lm.vo.Filter;
import com.prilax.lm.vo.Operator;

@Service
public class ScUserService {

	@Autowired
	private CommonService commonService;

	public UsersResponse findAllUsers() {

		UsersResponse res = new UsersResponse();

		List<ScUser> users = commonService.findAll(ScUser.class);

		if (!LmUtil.isAllPresent(users))
			throw new NotFoundException("No users can be found !");

		List<User> dtoUsers = new ArrayList<>();
		users.forEach(user -> {

			User dtoUser = setUserToDto(user);
			dtoUsers.add(dtoUser);

		});

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoUsers);
		return res;
	}

	public UserResponse findUser(Long id) {

		UserResponse res = new UserResponse();

		ScUser user = commonService.findById(id, ScUser.class);

		if (!LmUtil.isAllPresent(user))
			throw new NotFoundException("No users can be found !");

		User dtoUser = setUserToDto(user);

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoUser);

		return res;
	}
	
	public ScUser findUserByName(String username) {

		List<Filter> filters =  new ArrayList<>();
		filters.add(new Filter("email", Operator.EQUAL, FieldType.STRING, username));
		ScUser user = this.commonService.findOne(filters, ScUser.class);
		return user;
	}
	
	public UserResponse findUserResponse(String username) {

		UserResponse res = new UserResponse();

		List<Filter> filters =  new ArrayList<>();
		filters.add(new Filter("email", Operator.EQUAL, FieldType.STRING, username));
		ScUser user = this.commonService.findOne(filters, ScUser.class);
		
		if(user == null) {
			throw new UsernameNotFoundException("User not found");
		}

		if (!LmUtil.isAllPresent(user))
			throw new NotFoundException("No users can be found !");

		User dtoUser = setUserToDto(user);

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoUser);

		return res;
	}
	
	

	public User setUserToDto(ScUser user) {
		
		User dtoUser = new User();

		dtoUser.setEmail(user.getEmail());
		dtoUser.setName(user.getName());
		dtoUser.setId(user.getId());
		dtoUser.setMobile(user.getMobile());
		dtoUser.setGender(user.getGender());
		dtoUser.setStatus(user.getStatus());

		List<SCUserRole> userRoles = user.getUserRoles();
		if (LmUtil.isAllPresent(userRoles)) {

			List<Role> dtoRoles = new ArrayList<>();
			userRoles.forEach(userRole -> {

				Role dtoRole = new Role();
				ScRole role = userRole.getRole();

				if (role != null) {
					dtoRole.setId(role.getId());
					dtoRole.setName(role.getName());
				}
				dtoRoles.add(dtoRole);
			});
			dtoUser.setRoles(dtoRoles);

		}
		return dtoUser;
	}

	public ActionResponse createOrUpdateUser(User apiUser, Long id) {

		ActionResponse res = new ActionResponse();

		ScUser user = new ScUser();

		if (LmUtil.isAllPresent(id))
			user = commonService.findById(id, ScUser.class);

		if (!LmUtil.isAllPresent(user))
			throw new NotFoundException("No users can be found !");

		user.setEmail(apiUser.getEmail());
		user.setName(apiUser.getName());
		user.setMobile(apiUser.getMobile());
		user.setGender(apiUser.getGender());
		user.setStatus(apiUser.getStatus());
		user.setPassword(new BCryptPasswordEncoder().encode("admin"));

		if (LmUtil.isAllPresent(apiUser.getRoles())) {

			List<SCUserRole> userRoles = new ArrayList<>();
			for (Role apiRoles : apiUser.getRoles()) {

				ScRole role = commonService.findById(apiRoles.getId(), ScRole.class);
				SCUserRole userRole = new SCUserRole();
				userRole.setRole(role);
				userRole.setUser(user);
				userRoles.add(userRole);

			}
			if (LmUtil.isAllPresent(user.getUserRoles()))
				user.getUserRoles().clear();
			user.getUserRoles().addAll(userRoles);
		}
		commonService.save(user);

		String message = "";
		if (LmUtil.isAllPresent(id)) {
			message = "Successfully updated the user's data";
			res.setApiMessage(ApiUtil.createdMessage(message));
		} else {
			message = "Successfully created a user";
			res.setApiMessage(ApiUtil.okMessage(message));
			res.setActionMessage(message);
		}

		return res;
	}

	public ActionResponse deleteUser(Long id) {

		ActionResponse res = new ActionResponse();

		ScUser user = commonService.findById(id, ScUser.class);

		if (!LmUtil.isAllPresent(user))
			throw new NotFoundException("No users can be found !");

		commonService.delete(user);

		res.setApiMessage(ApiUtil.okMessage("Successfully deleted"));
		return res;
	}

}
