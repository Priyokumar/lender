package com.prilax.lm.security.dto;

import com.prilax.lm.dto.ApiMessage;

public class RoleResponse {

	private Role data;

	private ApiMessage apiMessage;

	public Role getData() {
		return data;
	}

	public void setData(Role data) {
		this.data = data;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}
	
	
}
