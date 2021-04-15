package com.prilax.lm.customer.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.prilax.lm.entity.LmRecordAudit;

@Entity
@Table(name = "LM_CUSTOMER")
public class LmCustomer implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "LM_ID")
	private Long id;
	
	@Column(name = "CUSTOMER_ID")
	private String customerId;

	@Column(name = "NAME")
	private String name;
	
	@Column(name = "MOBILE_NO")
	private String mobileNo;
	
	@Column(name = "GENDER")
	private String gender;
	
	@Column(name = "STATUS")
	private String status;
	
	@Column(name = "OCCUPATION")
	private String occupation;
	
	@Embedded
    private LmRecordAudit audit;

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

	public LmRecordAudit getAudit() {
		return audit;
	}

	public void setAudit(LmRecordAudit audit) {
		this.audit = audit;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	
	

}
