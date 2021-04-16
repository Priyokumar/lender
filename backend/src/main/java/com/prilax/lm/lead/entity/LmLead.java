package com.prilax.lm.lead.entity;

import java.io.Serializable;

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

import com.prilax.lm.customer.entity.LmCustomer;
import com.prilax.lm.entity.LmRecordAudit;
import com.prilax.lm.product.entity.LmProduct;

@Entity
@Table(name = "LM_LEAD")
public class LmLead implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "LM_ID")
	private Long id;

	@Column(name = "LEAD_ID")
	private String leadId;

	@Column(name = "REQUESTED_AMOUNT")
	private Double requestedAmount;

	@Column(name = "MONTHLY_INTEREST")
	private Double monthlyInterest;

	@Column(name = "EMI")
	private Double emi;

	@Column(name = "STATUS")
	private String status;

	@Column(name = "TENURE")
	private Integer tenure;

	@OneToOne(targetEntity = LmCustomer.class, fetch = FetchType.EAGER, cascade = CascadeType.MERGE, orphanRemoval = false)
	@JoinColumn(name = "CUSTOMER_ID")
	private LmCustomer customer;

	@OneToOne(targetEntity = LmProduct.class,fetch = FetchType.EAGER, cascade = CascadeType.MERGE, orphanRemoval = false)
	@JoinColumn(name = "PRODUCT_ID")
	private LmProduct product;

	@Embedded
	private LmRecordAudit audit;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLeadId() {
		return leadId;
	}

	public void setLeadId(String leadId) {
		this.leadId = leadId;
	}

	public Double getRequestedAmount() {
		return requestedAmount;
	}

	public void setRequestedAmount(Double requestedAmount) {
		this.requestedAmount = requestedAmount;
	}

	public Double getMonthlyInterest() {
		return monthlyInterest;
	}

	public void setMonthlyInterest(Double monthlyInterest) {
		this.monthlyInterest = monthlyInterest;
	}

	public Double getEmi() {
		return emi;
	}

	public void setEmi(Double emi) {
		this.emi = emi;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getTenure() {
		return tenure;
	}

	public void setTenure(Integer tenure) {
		this.tenure = tenure;
	}

	public LmCustomer getCustomer() {
		return customer;
	}

	public void setCustomer(LmCustomer customer) {
		this.customer = customer;
	}

	public LmProduct getProduct() {
		return product;
	}

	public void setProduct(LmProduct product) {
		this.product = product;
	}

	public LmRecordAudit getAudit() {
		return audit;
	}

	public void setAudit(LmRecordAudit audit) {
		this.audit = audit;
	}

}
