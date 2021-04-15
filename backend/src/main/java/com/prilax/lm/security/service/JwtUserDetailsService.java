package com.prilax.lm.security.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.prilax.lm.security.entity.ScUser;
import com.prilax.lm.service.common.CommonService;
import com.prilax.lm.vo.FieldType;
import com.prilax.lm.vo.Filter;
import com.prilax.lm.vo.Operator;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private CommonService commonService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		List<Filter> filters =  new ArrayList<>();
		filters.add(new Filter("email", Operator.EQUAL, FieldType.STRING, username));
		ScUser user = this.commonService.findOne(filters, ScUser.class);
		
		if(user == null) {
			throw new UsernameNotFoundException("User not found");
		}
		
		return new User(user.getEmail(), user.getPassword(), new ArrayList<>());

	}
}
