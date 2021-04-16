package com.prilax.lm.account.dto;

import java.util.Date;
import com.prilax.lm.entity.LmRecordAudit;

public class Emi  {

	private Long id;
	
	private Double emiAmount;

	private Date dueDate;

	private String status;

	private LmRecordAudit audit;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getEmiAmount() {
		return emiAmount;
	}

	public void setEmiAmount(Double emiAmount) {
		this.emiAmount = emiAmount;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LmRecordAudit getAudit() {
		return audit;
	}

	public void setAudit(LmRecordAudit audit) {
		this.audit = audit;
	}

}
