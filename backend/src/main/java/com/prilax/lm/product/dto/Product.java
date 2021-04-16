package com.prilax.lm.product.dto;

import com.prilax.lm.dto.RecordAudit;

public class Product {

	private Long id;
	
	private String productId;

	private String name;

	private String type;

	private Integer interest;
	
	private String frequency;
	
	private boolean securedProduct;

	private RecordAudit audit;

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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getInterest() {
		return interest;
	}

	public void setInterest(Integer interest) {
		this.interest = interest;
	}

	public RecordAudit getAudit() {
		return audit;
	}

	public void setAudit(RecordAudit audit) {
		this.audit = audit;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public boolean isSecuredProduct() {
		return securedProduct;
	}

	public void setSecuredProduct(boolean securedProduct) {
		this.securedProduct = securedProduct;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

}
