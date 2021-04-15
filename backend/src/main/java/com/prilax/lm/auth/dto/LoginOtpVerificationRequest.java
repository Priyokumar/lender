package com.prilax.lm.auth.dto;

public class LoginOtpVerificationRequest {

	private String userName;
	
	private Integer otp;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Integer getOtp() {
		return otp;
	}

	public void setOtp(Integer otp) {
		this.otp = otp;
	}
	
	
}
