package com.prilax.lm.account.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.prilax.lm.entity.LmRecordAudit;

@Entity
@Table(name = "LM_EMI")
public class LmEmi implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "LM_ID")
	private Long id;
	
	@Column(name = "emiAmount")
	private Double emiAmount;

	@Column(name = "DUE_DATE")
	private Date dueDate;

	@Column(name = "STATUS")
	private String status;

	@Embedded
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
