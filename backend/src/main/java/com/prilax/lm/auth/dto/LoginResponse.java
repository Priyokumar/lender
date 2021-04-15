package com.prilax.lm.auth.dto;

import com.prilax.lm.dto.ApiMessage;

public class LoginResponse {

	private String status;
	private String token;

	private ApiMessage apiMessage;
	
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
