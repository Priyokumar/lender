package com.prilax.lm.lead.dto;

import javax.persistence.Embedded;

import com.prilax.lm.customer.dto.Customer;
import com.prilax.lm.dto.RecordAudit;
import com.prilax.lm.product.dto.Product;

public class Lead {

	private Long id;

	private String leadId;

	private Double requestedAmount;

	private Double monthlyInterest;

	private Double emi;

	private String status;

	private Integer tenure;

	private Customer customer;

	private Product product;

	@Embedded
	private RecordAudit audit;

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

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public RecordAudit getAudit() {
		return audit;
	}

	public void setAudit(RecordAudit audit) {
		this.audit = audit;
	}

}
