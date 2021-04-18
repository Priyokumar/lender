package com.prilax.lm.repayment.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.prilax.lm.account.entity.LmAccount;
import com.prilax.lm.entity.LmRecordAudit;

@Entity
@Table(name = "LM_REPAYMENT")
public class LmRepayment implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "LM_ID")
	private Long id;

	@Column(name = "REPAYMENT_ID")
	private String repaymentId;
	
	@Column(name = "DATE_OF_PAYMENT")
	private Date dateOfPayment;
	
	@Column(name = "AMOUNT_PAID")
	private Double amountPaid;
	
	@Column(name = "DUE_AMOUNT")
	private Double dueAmount;

	@Column(name = "STATUS")
	private String status;

	@OneToOne(targetEntity = LmAccount.class,fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = false)
	@JoinColumn(name = "LEAD_ID")
	private LmAccount account;

	@Embedded
	private LmRecordAudit audit;

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

	public LmAccount getAccount() {
		return account;
	}

	public void setAccount(LmAccount account) {
		this.account = account;
	}

	public LmRecordAudit getAudit() {
		return audit;
	}

	public void setAudit(LmRecordAudit audit) {
		this.audit = audit;
	}

}
