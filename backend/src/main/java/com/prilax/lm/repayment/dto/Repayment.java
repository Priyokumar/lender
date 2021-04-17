package com.prilax.lm.repayment.dto;

import java.util.Date;

import com.prilax.lm.account.dto.Account;
import com.prilax.lm.dto.RecordAudit;

public class Repayment {

	private Long id;

	private String repaymentId;
	
	private Date dateOfPayment;
	
	private Double amountPaid;
	
	private Double dueAmount;

	private String status;

	private Account account;

	private RecordAudit audit;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRepaymentId() {
		return repaymentId;
	}

	public void setRepaymentId(String repaymentId) {
		this.repaymentId = repaymentId;
	}

	public Date getDateOfPayment() {
		return dateOfPayment;
	}

	public void setDateOfPayment(Date dateOfPayment) {
		this.dateOfPayment = dateOfPayment;
	}

	public Double getAmountPaid() {
		return amountPaid;
	}

	public void setAmountPaid(Double amountPaid) {
		this.amountPaid = amountPaid;
	}

	public Double getDueAmount() {
		return dueAmount;
	}

	public void setDueAmount(Double dueAmount) {
		this.dueAmount = dueAmount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public RecordAudit getAudit() {
		return audit;
	}

	public void setAudit(RecordAudit audit) {
		this.audit = audit;
	}

}
