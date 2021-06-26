package com.prilax.lm.account.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.prilax.lm.dto.RecordAudit;
import com.prilax.lm.lead.dto.Lead;

public class Account {

	private Long id;

	private String accountNo;
	
	private Date dateOfCreation;
	
	private Date repaymentDate;
	
	private Double closingBalance;

	private String status;

	private Lead lead;
	
	private List<Emi> emis = new ArrayList<>();

	private RecordAudit audit;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	public Date getRepaymentDate() {
		return repaymentDate;
	}

	public void setRepaymentDate(Date repaymentDate) {
		this.repaymentDate = repaymentDate;
	}

	public Double getClosingBalance() {
		return closingBalance;
	}

	public void setClosingBalance(Double closingBalance) {
		this.closingBalance = closingBalance;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Lead getLead() {
		return lead;
	}

	public void setLead(Lead lead) {
		this.lead = lead;
	}

	public List<Emi> getEmis() {
		return emis;
	}

	public void setEmis(List<Emi> emis) {
		this.emis = emis;
	}

	public RecordAudit getAudit() {
		return audit;
	}

	public void setAudit(RecordAudit audit) {
		this.audit = audit;
	}

	public Date getDateOfCreation() {
		return dateOfCreation;
	}

	public void setDateOfCreation(Date dateOfCreation) {
		this.dateOfCreation = dateOfCreation;
	}
	
	
}
