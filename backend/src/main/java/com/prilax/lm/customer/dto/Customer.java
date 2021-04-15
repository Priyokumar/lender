package com.prilax.lm.customer.dto;

import java.io.Serializable;

import com.prilax.lm.dto.RecordAudit;

public class Customer implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	
	private String customerId;

	private String name;

	private String mobileNo;

	private String gender;

	private String status;

	private String occupation;

	private RecordAudit audit = new RecordAudit();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public RecordAudit getAudit() {
		return audit;
	}

	public void setAudit(RecordAudit audit) {
		this.audit = audit;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	
	

}
