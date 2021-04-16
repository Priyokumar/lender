package com.prilax.lm.account.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.prilax.lm.entity.LmRecordAudit;
import com.prilax.lm.lead.entity.LmLead;

@Entity
@Table(name = "LM_ACCOUNT")
public class LmAccount implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "LM_ID")
	private Long id;

	@Column(name = "ACCOUNT_NO")
	private String accountNo;

	@Column(name = "AMOUNT")
	private Double amount;
	
	@Column(name = "DATE_OF_CREATION")
	private Date dateOfCreation = new Date();
	
	@Column(name = "REPAYMENT_DATE")
	private Date repaymentDate;
	
	@Column(name = "CLOSING_BALANCE")
	private Double closingBalance;

	@Column(name = "STATUS")
	private String status;

	@OneToOne(targetEntity = LmLead.class,fetch = FetchType.EAGER, cascade = CascadeType.MERGE, orphanRemoval = false)
	@JoinColumn(name = "LEAD_ID")
	private LmLead lead;
	
	@OneToMany(targetEntity = LmEmi.class, cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	@JoinColumn(name = "ACCOUNT_ID", referencedColumnName = "LM_ID")
	@Fetch(value = FetchMode.SUBSELECT)
	private List<LmEmi> emis = new ArrayList<>();

	@Embedded
	private LmRecordAudit audit;

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

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Date getDateOfCreation() {
		return dateOfCreation;
	}

	public void setDateOfCreation(Date dateOfCreation) {
		this.dateOfCreation = dateOfCreation;
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

	public LmLead getLead() {
		return lead;
	}

	public void setLead(LmLead lead) {
		this.lead = lead;
	}

	public List<LmEmi> getEmis() {
		return emis;
	}

	public void setEmis(List<LmEmi> emis) {
		this.emis = emis;
	}

	public LmRecordAudit getAudit() {
		return audit;
	}

	public void setAudit(LmRecordAudit audit) {
		this.audit = audit;
	}

}
